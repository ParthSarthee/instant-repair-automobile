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

const cities = [
	"Phagwara",
	"Jalandhar",
	"Amritsar",
	"Ludhiana",
	"Pathankot",
	"Chandigarh",
	"Patna",
];

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
		<div className="flex flex-col md:flex-row justify-center items-center md:items-stretch p-8 gap-8">
			<div className="w-full md:w-2/3 max-h-[500px] lg:max-w-[700px]">
				<img src="/hero.jpg" className="" />
			</div>

			<div className="md:w-1/3 w-full flex flex-col gap-4 ">
				{account ? <BookingCard /> : <LoginCard />}
			</div>
		</div>
	);
}

function Services() {
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
				<div className="bg-neutral-100">
					<div className="flex flex-col gap-4 bg-white p-8 rounded shadow-lg">
						<div className="flex flex-col gap-1">
							<span>Name: </span>
							<input
								type="text"
								onChange={(e) =>
									setUserData({ ...userData, name: e.target.value })
								}
								value={userData.name}
								placeholder="Enter Your Name"
								className="ring-black ring-1 rounded px-4 py-2"
							/>
						</div>

						<div>
							<span>Type: </span> <br />
							<select
								onChange={(e) =>
									setUserData({ ...userData, type: e.target.value })
								}
								value={userData.type}
								className="ring-black ring-1 rounded px-4 py-2 w-full"
							>
								<option value="user">User</option>
								<option value="mechanic">Mechanic</option>
							</select>
						</div>

						{userData.type == "mechanic" && (
							<>
								<div>
									<span>Skill: </span> <br />
									<select
										onChange={(e) =>
											setUserData({ ...userData, skill: e.target.value })
										}
										value={userData.skill}
										className="ring-black ring-1 rounded px-4 py-2 w-full"
									>
										<option value="two">Two Wheelers</option>
										<option value="three">Three Wheelers</option>
										<option value="four">Four Wheelers</option>
										<option value="heavy">Heavy Vehicles</option>
									</select>
								</div>
								<div>
									<span>Location: </span> <br />
									<select
										onChange={(e) =>
											setUserData({ ...userData, location: e.target.value })
										}
										value={userData.location}
										className="ring-black ring-1 rounded px-4 py-2 w-full"
									>
										{cities.map((city) => (
											<option key={city} value={city}>
												{city}
											</option>
										))}
									</select>
								</div>
							</>
						)}

						<button
							href="/service"
							className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
							onClick={login}
						>
							{!loading && "Signup"}
							{loading && <Loading />}
						</button>
					</div>
				</div>
			</Modal>
			<div className="md:h-full flex flex-col justify-between gap-4 my-2">
				<div className="flex flex-col gap-4 bg-white p-8 rounded shadow-lg">
					<div className="flex flex-col gap-1">
						<span>Phone: </span>
						<input
							type="text"
							onChange={(e) =>
								setUserData({ ...userData, phone: e.target.value })
							}
							value={userData.phone}
							placeholder="Enter Your Phone"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span>Password: </span>
						<input
							type="password"
							onChange={(e) =>
								setUserData({ ...userData, pass: e.target.value })
							}
							value={userData.pass}
							placeholder="Enter A Password"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>

					<button
						href="/service"
						className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
						onClick={login}
					>
						{!loading && "Login"}
						{loading && <Loading />}
					</button>
				</div>
				<div className="flex justify-center items-center flex-col">
					<p>Explore Our Services</p>
					<Link
						href="/service"
						className="mt-4 bg-primary text-white text-center px-4 py-2 font-semibold rounded w-full"
					>
						Skip Login
					</Link>
				</div>
			</div>
		</>
	);
}

function BookingCard() {
	const [myService, setMyService] = useState(null);
	const [paymentModal, setPaymentModal] = useState(false);

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
		console.log(res);
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

	async function reviewMechanic(rating) {
		const backup = JSON.parse(JSON.stringify(myService));
		setMyService({
			...myService,
			mechanic: myService.mechanic,
			user: myService.user,
			rating: rating,
			reviewed: true,
		});
		toast.success("Rating Submitted");

		const res = await crud.put("/service/" + myService._id, null, {
			rating: rating,
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

	return (
		<div className="flex flex-col justify-between gap-4 bg-white p-8 rounded shadow-lg md:h-full my-2">
			<div className="flex flex-col gap-1 w-full text-center font-semibold">
				<h1>
					My Booking{"  "}
					<span className="px-2.5 py-1.5 ml-1 bg-primary rounded-2xl text-white">
						{myService && myService.status}
					</span>
				</h1>
			</div>
			<div className="flex flex-col gap-1 text-sm">
				<h1>
					<span className="font-semibold">Mechanic:</span>{" "}
					{myService && myService.mechanic.name}
				</h1>
				<h1>
					<span className="font-semibold">Vehicle:</span>{" "}
					{myService && myService.vehicle + " | " + myService.plate}
				</h1>
				<h1>
					<span className="font-semibold">Details:</span>{" "}
					{myService && myService.description}
				</h1>
			</div>

			<Modal isOpen={paymentModal}>
				<div className="bg-white p-4 flex flex-col justify-center items-center gap-8 mx-4 md:m-auto">
					<img src="qr.jpeg" alt="" />
					<div className="flex flex-col md:flex-row gap-4 w-full p-4">
						<button
							className="w-full rounded px-4 py-2 bg-primary"
							onClick={() => setPaymentModal(false)}
						>
							Cancel Payment
						</button>
						<button
							className="w-full rounded px-4 py-2 bg-primary"
							onClick={pay}
						>
							Complete Payment
						</button>
					</div>
				</div>
			</Modal>

			{myService && myService.status == "Requested" && (
				<div className="flex flex-col gap-1">
					<button
						className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
						onClick={cancelBooking}
					>
						Cancel Booking
					</button>
					<a
						className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
						href={"tel:" + myService.mechanic.phone}
					>
						Call Mechanic
					</a>
				</div>
			)}

			{myService && myService.status == "Ongoing" && (
				<div className="flex flex-col gap-1">
					<a
						className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
						href={"tel:" + myService.mechanic.phone}
					>
						Call Mechanic
					</a>
					{myService.amount > 0 && (
						<button
							className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
							onClick={() => setPaymentModal(true)}
						>
							Pay {myService.amount}
						</button>
					)}
				</div>
			)}
			{myService &&
				myService.status != "Requested" &&
				myService.status != "Ongoing" && (
					<div className="flex flex-col gap-1">
						{myService.rating > -1 && (
							<div className="flex justify-center items-center">
								<Rating
									SVGstyle={{ display: "inline-block" }}
									onClick={reviewMechanic}
									initialValue={myService.rating}
									readonly={myService.reviewed}
								/>
							</div>
						)}
						<Link
							href="/service"
							className="mt-4 bg-primary text-center text-white px-4 py-2 font-semibold rounded"
						>
							New Booking
						</Link>
					</div>
				)}
		</div>
	);
}
