"use client";
import crud from "@/plugins/crud";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";

const faqs = [
	{
		question: "How does your doorstep service work?",
		answer:
			"Our doorstep service is designed for convenience. Book an appointment through our app, and our technicians will arrive at your location to repair your vehicle on the spot.",
	},
	{
		question: "What types of vehicle damages can you repair on the spot?",
		answer:
			"We specialize in repairing minor dents, scratches, tire punctures, battery replacements, and more. Our technicians are equipped for various on-the-spot repairs.",
	},
	{
		question:
			"How long does it take for your technicians to arrive after booking a service?",
		answer:
			"Our aim is prompt service. Technicians typically arrive within [insert estimated time] after booking through the app.",
	},
	{
		question: "Do I need to provide any tools or equipment for the repair?",
		answer:
			"No, our technicians come fully equipped. You just need to provide access to your vehicle.",
	},
	{
		question: "What if I'm not satisfied with the repair?",
		answer:
			"Customer satisfaction is our priority. If unsatisfied, contact our customer support team, and we'll address your concerns promptly.",
	},
	{
		question: "Are your technicians trained and certified?",
		answer:
			"Yes, all our technicians are highly trained professionals with years of experience in automobile repair. They undergo regular training to stay updated.",
	},
	{
		question: "Is there any warranty on the repairs?",
		answer:
			"Yes, we stand behind our workmanship. We offer a [insert duration] warranty on all repairs. Any issues within the warranty period will be rectified at no additional cost.",
	},
	{
		question: "How do I pay for the service?",
		answer:
			"We offer multiple payment options for your convenience. Pay securely through our app using credit/debit cards, digital wallets, or cash on delivery.",
	},
	{
		question: "Do you provide emergency roadside assistance?",
		answer:
			"Yes, we understand emergencies can happen anytime. We offer emergency roadside assistance round the clock. Simply contact us through our app, and we'll dispatch a technician to your location as soon as possible.",
	},
	{
		question:
			"Can I track the status of my service appointment through the app?",
		answer:
			"Absolutely! Our app allows you to track the status of your service appointment in real-time. You'll receive notifications at each stage of the repair process, from booking confirmation to technician arrival.",
	},
];

const reviews = [
	{
		user: { name: "John Doe" },
		rating: 4,
		review: "Great service! Quick response and professional technicians.",
		created: new Date(),
	},
];

function AboutPage() {
	return (
		<div className="w-full flex flex-col justify-center items-center mt-20 p-8 bg-neutral-100 gap-12">
			<h1 className="text-4xl mb-6 mt-6">The Instant Repair Automobile</h1>
			<div className="w-full flex flex-col md:flex-row gap-8 max-w-screen-lg justify-center items-stretch">
				<AboutCard />
				<ContactCard />
			</div>
			<FAQ />
			<Reviews />
		</div>
	);
}

function AboutCard() {
	return (
		<div className="md:w-1/2 p-8 gap-4 flex flex-col items-center bg-white shadow-lg rounded-lg ring-1 ring-primary hover:scale-[102%] hover:ring">
			<h1 className="text-3xl h1-orange">About US</h1>
			<p className="font-extralight">
				Introducing IRA, your go-to solution for quick and stress-free car
				repairs on the go! Our app is designed to connect car owners with
				skilled mechanics swiftly, ensuring immediate response to vehicular
				breakdowns. With real-time location tracking and task assignment, we
				prioritize reducing waiting times and making roadside assistance
				hassle-free. Say goodbye to stress and hello to seamless car repairs
				with IRA.
			</p>
		</div>
	);
}

function ContactCard() {
	return (
		<div className="md:w-1/2 p-8 gap-4 flex flex-col  items-center bg-white shadow-lg rounded-lg ring-1 ring-primary hover:scale-[102%] hover:ring">
			<h1 className="text-3xl h1-orange">Contact US</h1>
			<ul className="list-disc font-extralight">
				<li>
					Address: University Campus, Lovely Professional University, Phagwara,
					Punjab-144411
				</li>
				<li>Email: ira24×7@gmail.com</li>
				<li>Phone no: 7009922534</li>
			</ul>
		</div>
	);
}

function FAQ() {
	return (
		<div
			id="faq"
			className="w-full flex flex-col justify-center items-center my-16 px-8 "
		>
			<h1 className="text-4xl mb-12">FAQs</h1>
			{faqs.map((faq, index) => (
				<FAQCard key={index} faq={faq} />
			))}
		</div>
	);
}

function FAQCard({ faq }) {
	const [hidden, setHidden] = React.useState(true);

	return (
		<div className="w-full max-w-screen-lg border-b border-dashed p-4 border-neutral-500 text-gray-800">
			<div
				className="w-full flex justify-between items-center cursor-pointer"
				onClick={() => setHidden(!hidden)}
			>
				<h2 className="text-2xl">{faq.question}</h2>{" "}
				<span className="text-2xl">{hidden ? "+" : "-"}</span>
			</div>
			<p className={"p-1 mr-4 " + (hidden && "hidden")}>{faq.answer}</p>
		</div>
	);
}

function Reviews() {
	const [reviews, setReviews] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const res = await crud.get("/service/list", { reviewed: true });
			if (res.error) toast.error(res.error);
			else setReviews(res.data);
			setLoading(false);
		})();
	}, []);

	return (
		<div
			id="review"
			className="w-full flex flex-col justify-center items-center my-16 px-8 gap-4 "
		>
			<h1 className="text-4xl mb-12">Reviews</h1>
			{reviews.map((review, index) => (
				<ReviewCard key={index} review={review} />
			))}
		</div>
	);
}

function ReviewCard({ review }) {
	return (
		<div className="flex flex-col w-full max-w-screen-lg p-8 bg-white rounded-lg shadow-lg gap-4">
			<div className="w-full flex sm:flex-row flex-col gap-2 justify-between">
				<div className="flex gap-2 sm:flex-row flex-col">
					<div className="w-16 h-16 bg-primary font-bold rounded-full text-white flex justify-center items-center text-3xl">
						{review.user.name[0]}
					</div>
					<div className="flex flex-col ">
						<h2 className="ml-1">{review.user.name}</h2>
						<div>
							<Rating
								SVGstyle={{ display: "inline-block" }}
								initialValue={review.rating}
								readonly={true}
							/>
						</div>
					</div>
				</div>
				<p className="between">{new Date(review.created).toDateString()}</p>
			</div>
			<p className="w-full sm:px-4">{review.review}</p>
		</div>
	);
}

export default AboutPage;
