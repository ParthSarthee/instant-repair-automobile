/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import crud from "@/plugins/crud";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import Slider from "react-slick";
// import Plyr from "plyr-react";
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";
import Script from "next/script";

const cities = [
	"Phagwara",
	"Jalandhar",
	"Amritsar",
	"Ludhiana",
	"Pathankot",
	"Chandigarh",
	"Patna",
];

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	autoplay: true,
	slidesToShow: 1,
	slidesToScroll: 1,
};

export default function Home() {
	return (
		<>
			<Hero />
			<Services />
		</>
	);
}

function Hero() {
	const account = authStore((state) => state.account);

	return (
		<div className="flex flex-col md:flex-row justify-center items-center md:items-stretch p-8 gap-8 mt-32">
			<div className="w-full md:w-2/3 max-h-[500px] lg:max-w-[700px]">
				<Slider {...settings}>
					<img className="rounded-lg" src="/s1.jpg" alt="" />
					<img className="rounded-lg" src="/s2.jpg" alt="" />
					<img className="rounded-lg" src="/s3.jpg" alt="" />
				</Slider>
			</div>

			<div className="md:w-1/3 w-full flex flex-col gap-4 ">
				{account ? <BookingCard /> : <LoginCard />}
			</div>
		</div>
	);
}

function Services() {
	return (
		<div className="flex flex-col justify-center items-center mt-10 gap-8">
			<h1 className="font-semibold text-center text-5xl mt-20 mb-8 p-2 ">
				Our Services
			</h1>
			<div className="flex bg-white ring-1 ring-primary justify-center items-center p-10 shadow-lg md:gap-20 gap-6 max-w-screen-lg rounded-lg hover:scale-[102%] hover:ring cursor-pointer hover:shadow-2xl mx-8 md:flex-row flex-col-reverse">
				<div className="flex flex-col gap-2 md:w-1/2 w-full">
					<h1 className=" h1-orange text-3xl text-center md:text-left font-semibold text-primary">
						Instant Service
					</h1>
					<p className="font-extralight text-neutral-800">
						Instant Repair Service offers quick and reliable assistance for
						sudden mechanical issues with cars. Available 24/7, it connects
						customers with skilled technicians who can provide on-the-spot
						repairs. The service includes transparent pricing and offers
						recovery if needed. With this service, car owners can get back on
						the road quickly and with minimal hassle.
					</p>
				</div>
				<div className="w-full md:w-1/2 rounded-lg border border-white bg-white p-[2px]">
					<Plyr
						id="player"
						source={{
							type: "video",
							sources: [
								{
									src: "944812630",
									provider: "vimeo",
								},
							],
						}}
					/>
				</div>
			</div>

			<div className="flex bg-white ring-1 ring-primary justify-center items-center p-10 shadow-lg md:gap-20 gap-6 max-w-screen-lg rounded-lg hover:scale-[102%] hover:ring cursor-pointer hover:shadow-2xl mx-8 md:flex-row flex-col">
				<div className="w-full md:w-1/2 rounded-lg border border-black bg-black p-[2px]">
					<Plyr
						id="player"
						source={{
							type: "video",
							sources: [
								{
									src: "944812630", //"944822442",
									provider: "vimeo",
								},
							],
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 md:w-1/2 w-full">
					<h1 className="text-3xl h1-orange text-center md:text-left font-semibold text-primary">
						Doorstep Service
					</h1>
					<p className="font-extralight text-neutral-800">
						Doorstep Service allows customers to schedule a mechanic visit at a
						time and location of their choosing. Offering flexibility, the
						service brings certified mechanics to the customer's home or
						workplace. Transparent pricing ensures customers know costs upfront.
						Dedicated support helps with scheduling and updates for a
						hassle-free experience.
					</p>
				</div>
			</div>
		</div>
	);
}

function LoginCard() {
	const [userData, setUserData] = useState({
		phone: "",
		pass: "",
		name: "",
		type: "user",
	});

	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	async function login(e) {
		setLoading(true);
		e.preventDefault();
		const res = await crud.post("/auth/one", null, userData);
		console.log(res);

		if (res && res.error) {
			toast.error(res.msg);
		} else if (res && res.data && res.data.incomplete) {
			toast("Please complete your profile to continue");
			setShowModal(true);
		} else if (res && res.data && res.data.token) {
			// localStorage.setItem("token", res.data.token.key);
			// localStorage.setItem("account", JSON.stringify(res.data.account));
			authStore.getState().login(res.data.token.key, res.data.account);
			toast.success("Login Successful");
		} else {
			toast.error("Something went wrong");
		}

		setLoading(false);
		return;
	}

	return (
		<>
			<Modal isOpen={showModal}>
				<div className="w-full max-w-sm m-4">
					<div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg justify-center items-center w-full ring-1 ring-primary">
						<h1 className="text-2xl font-semibold text-primary h1-orange text-center mb-4">
							Signup Form
						</h1>
						<div className="flex flex-col gap-1 w-full">
							<Input
								type="text"
								onChange={(e) =>
									setUserData({ ...userData, name: e.target.value })
								}
								value={userData.name}
								placeholder="Your Name"
								label="Your Name"
								size="lg"
							/>
						</div>

						<div className="w-full">
							<Select
								onChange={(e) => setUserData({ ...userData, type: e })}
								value={userData.type}
								className="w-full"
								label="Account Type"
								size="md"
							>
								<Option value="user">User</Option>
								<Option value="mechanic">Mechanic</Option>
							</Select>
						</div>

						{userData.type == "mechanic" && (
							<>
								<div className="w-full">
									<Select
										onChange={(e) => setUserData({ ...userData, skill: e })}
										value={userData.skill}
										className="w-full"
										label="Your Skill"
										size="md"
									>
										<Option value="two">Two Wheelers</Option>
										<Option value="three">Three Wheelers</Option>
										<Option value="four">Four Wheelers</Option>
										<Option value="heavy">Heavy Vehicles</Option>
									</Select>
								</div>
								<div className="w-full">
									<Select
										onChange={(e) => setUserData({ ...userData, location: e })}
										value={userData.location}
										className="w-full"
										label="Your Location"
										size="md"
									>
										{cities.map((city) => (
											<Option key={city} value={city}>
												{city}
											</Option>
										))}
									</Select>
								</div>
							</>
						)}

						<Button
							href="/service"
							className="mt-4 bg-primary w-full hover:bg-primary-light"
							size="md"
							onClick={login}
							loading={loading}
						>
							Signup
						</Button>
					</div>
				</div>
			</Modal>
			<div className="md:h-full flex flex-col justify-between gap-4 my-2">
				<div className="flex flex-col gap-4 bg-white p-8 rounded-lg ring-1 ring-primary shadow-lg">
					<h1 className="text-3xl h1-orange font-semibold text-primary text-center mb-4">
						Login or Signup
					</h1>
					<div className="flex flex-col gap-1">
						<Input
							type="tel"
							placeholder=" Phone Number"
							label=" Phone Number"
							size="lg"
							value={userData.phone}
							onChange={(e) =>
								setUserData({ ...userData, phone: e.target.value })
							}
						/>
					</div>
					<div className="flex flex-col gap-1 mt-1 mb-4">
						<Input
							type="password"
							value={userData.pass}
							onChange={(e) =>
								setUserData({ ...userData, pass: e.target.value })
							}
							placeholder="Your Password"
							label="Your Password"
							size="lg"
						/>
					</div>

					<Button
						size="md"
						className="bg-primary hover:bg-primary-light"
						onClick={login}
						loading={loading}
					>
						Login / Singup
					</Button>
				</div>
				<div className="flex justify-center items-center flex-col">
					<p>Explore Our Services</p>
					<Link href="/service" className="mt-4 w-full">
						<Button
							className="bg-white text-primary hover:bg-gray-800 hover:text-white"
							// variant="outlined"
							// color="orange"
							size="md"
							fullWidth
						>
							Skip Login
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}

function BookingCard() {
	const [myService, setMyService] = useState(null);
	const [paymentModal, setPaymentModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [ratingModal, setRatingModal] = useState(false);

	const account = authStore((state) => state.account);

	useEffect(() => {
		refreshService();
		const itv = setInterval(refreshService, 2000);
		return () => clearInterval(itv);
	}, []);

	async function refreshService() {
		const account = authStore.getState().account;
		const res = await crud.get("/service/list", { user: account._id });
		if (res.error) toast.error(res.msg);
		else setMyService(res.data[0]);
		setLoading(false);
		if (
			res.data &&
			res.data.length > 0 &&
			res.data[0].status == "Completed" &&
			!res.data[0].reviewed
		) {
			setRatingModal(true);
		}
	}

	async function cancelBooking() {
		const backup = JSON.parse(JSON.stringify(myService));
		setMyService({
			...myService,
			mechanic: myService.mechanic,
			user: myService.user,
			status: "Cancelled",
			rating: -1,
		});
		toast.success("Booking Cancelled");

		const res = await crud.put("/service/" + myService._id, null, {
			status: "Cancelled",
			rating: -1,
		});
		if (res.error) {
			toast.error(res.msg);
			setMyService(backup);
		} else {
		}
	}

	async function reviewMechanic() {
		if (rating < 1 || !review) {
			toast.error("Please provide rating and review");
			return;
		}

		const backup = JSON.parse(JSON.stringify(myService));
		setMyService({
			...myService,
			mechanic: myService.mechanic,
			user: myService.user,
			rating: rating,
			review: review,
			reviewed: true,
		});
		toast.success("Rating Submitted");
		setRatingModal(false);
		const res = await crud.put("/service/" + myService._id, null, {
			rating: rating,
			review: review,
			reviewed: true,
		});
		if (res.error) {
			toast.error(res.msg);
			setMyService(backup);
		} else {
		}
	}

	async function pay() {
		const backup = JSON.parse(JSON.stringify(myService));
		setMyService({
			...myService,
			mechanic: myService.mechanic,
			user: myService.user,
			status: "Completed",
		});
		toast.success("Payment Completed");
		setPaymentModal(false);

		const res = await crud.put("/service/" + myService._id, null, {
			status: "Completed",
		});
		if (res.error) {
			toast.error(res.msg);
			setMyService(backup);
		} else {
		}
	}

	if (loading) return <Loading />;
	else if (!myService)
		return (
			<div className="flex flex-col justify-center items-center gap-4 bg-white p-8 ring-1 ring-primary rounded-lg shadow-lg md:h-full my-2">
				<h1 className="h1-orange">Hello, {account.name}</h1>
				{account && account.type == "user" ? (
					<Link href="/service">
						<Button color="green">Create Your First Booking</Button>
					</Link>
				) : (
					<Link href="/mechanic">
						<Button color="green">Go To Your Dashboard</Button>
					</Link>
				)}
			</div>
		);

	return (
		<div className="flex flex-col justify-between gap-4 bg-white p-8 ring-1 ring-primary rounded-lg shadow-lg md:h-full my-2">
			<div className="flex flex-col gap-1 w-full text-center font-semibold">
				<h1 className="h1-orange">
					My Booking{"  "}
					<span className="px-2.5 py-1.5 ml-1 bg-primary rounded-2xl text-white">
						{myService && myService.status}
					</span>
				</h1>
			</div>
			<div className="flex flex-col gap-1 text-sm">
				<h2>
					<span className="font-semibold">Mechanic:</span>{" "}
					{myService && myService.mechanic.name}
				</h2>
				<h2>
					<span className="font-semibold">Vehicle:</span>{" "}
					{myService && myService.vehicle + " | " + myService.plate}
				</h2>
				<h2>
					<span className="font-semibold">Details:</span>{" "}
					{myService && myService.description}
				</h2>
			</div>

			<Modal isOpen={paymentModal}>
				<div className="bg-white rounded-lg ring-1 ring-primary p-4 flex flex-col justify-center items-center gap-8 mx-4 md:m-auto">
					<img src="qr.jpeg" alt="" />
					<div className="flex flex-col md:flex-row gap-4 w-full p-4">
						<Button
							className="w-full"
							color="red"
							onClick={() => setPaymentModal(false)}
						>
							Cancel Payment
						</Button>
						<Button className="w-full" color="green" onClick={pay}>
							Complete Payment
						</Button>
					</div>
				</div>
			</Modal>

			<Modal isOpen={ratingModal}>
				<div className="bg-white rounded-lg ring-1 ring-primary p-4 flex flex-col justify-center items-center gap-8 mx-4 md:m-auto">
					<div className="flex flex-col justify-center items-center gap-4 w-full p-4">
						<h1 className="h1-orange text-2xl w-full text-center">
							Rate & Review
						</h1>
						<Rating
							SVGstyle={{ display: "inline-block" }}
							onClick={(e) => setRating(e)}
							value={rating}
						/>
						<Input
							placeholder="Review"
							label="Review"
							value={review}
							onChange={(e) => setReview(e.target.value)}
						/>
						<Button className="w-full" color="green" onClick={reviewMechanic}>
							Submit Review
						</Button>
					</div>
				</div>
			</Modal>

			{myService && myService.status == "Requested" && (
				<div className="flex flex-col gap-1">
					<Button className="mt-4" color="red" onClick={cancelBooking}>
						Cancel Booking
					</Button>
					<a className="mt-4 w-full" href={"tel:" + myService.mechanic.phone}>
						<Button className="w-full" color="green">
							Call Mechanic
						</Button>
					</a>
				</div>
			)}

			{myService && myService.status == "Ongoing" && (
				<div className="flex flex-col gap-3">
					<a className="mt-4 w-full" href={"tel:" + myService.mechanic.phone}>
						<Button className="w-full" color="green">
							Call Mechanic
						</Button>
					</a>
					{myService.amount > 0 && (
						<Button color="blue" onClick={() => setPaymentModal(true)}>
							Pay {myService.amount}
						</Button>
					)}
				</div>
			)}
			{myService &&
				myService.status != "Requested" &&
				myService.status != "Ongoing" && (
					<div className="flex flex-col gap-1">
						{myService.rating > 0 && (
							<div className="flex justify-center items-center">
								<Rating
									SVGstyle={{ display: "inline-block" }}
									// onClick={reviewMechanic}
									initialValue={myService.rating}
									readonly={true}
								/>
							</div>
						)}
						{myService.rating == 0 && (
							<Button
								color="blue"
								className="w-full"
								onClick={() => setRatingModal(true)}
							>
								Rate This Service
							</Button>
						)}
						<Link href="/service" className="mt-4 w-full">
							<Button color="green" className="w-full">
								New Booking
							</Button>
						</Link>
					</div>
				)}
		</div>
	);
}

function ServicesBackup() {
	return (
		<>
			<h1 className="font-semibold text-center text-5xl mt-12">Our Services</h1>
			<div className="flex md:flex-row flex-col justify-center items-center gap-8 md:gap-[5%] mt-12">
				<div className="flex flex-col bg-white rounded justify-center items-center max-w-[400px] p-8 shadow-lg gap-4">
					<h1 className="text-3xl font-semibold text-primary">
						Instant Service
					</h1>
					{/* <img src="/card1.jpg"  /> */}
					<div className="">
						<iframe
							width="320"
							height="170"
							src="https://www.youtube.com/embed/C9Ee82hF2l8?si=owIsyppQR3nZujgO"
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</div>
					<p>
						Instant Repair Service offers quick and reliable assistance for
						sudden mechanical issues with cars. Available 24/7, it connects
						customers with skilled technicians who can provide on-the-spot
						repairs. The service includes transparent pricing and offers
						recovery if needed. With this service, car owners can get back on
						the road quickly and with minimal hassle.
					</p>
				</div>

				<div className="flex flex-col bg-white rounded justify-center items-center max-w-[400px] p-8 shadow-lg gap-4">
					<h1 className="text-3xl font-semibold text-primary">
						Doorstep Service
					</h1>
					<div>
						<iframe
							width="320"
							height="170"
							src="https://www.youtube.com/embed/gheAwVmNx7k?si=fYXxo7EflOdhg7df"
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</div>
					<p>
						Doorstep Service allows customers to schedule a mechanic visit at a
						time and location of their choosing. Offering flexibility, the
						service brings certified mechanics to the customer's home or
						workplace. Transparent pricing ensures customers know costs upfront.
						Dedicated support helps with scheduling and updates for a
						hassle-free experience.
					</p>
				</div>
			</div>
		</>
	);
}
