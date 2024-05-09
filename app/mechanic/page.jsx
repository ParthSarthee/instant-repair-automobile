"use client";
import crud from "@/plugins/crud";
import React, { useEffect, useState } from "react";
import { authStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { Rating } from "react-simple-star-rating";
import Modal from "@/components/Modal";

function MechanicsPage() {
	const account = authStore((state) => state.account);
	const [mechanic, setMechanic] = useState({});
	const [serviceList, setServiceList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (account) {
				const res = await crud.get("/account/one/" + account._id);
				console.log(res);
				if (res.error) console.log(res.msg);
				else setMechanic(res.data);
			}
		})();
	}, [account]);

	useEffect(() => {
		let si;
		if (account) {
			listServices();
			si = setInterval(listServices, 5000);
		}
		return () => clearInterval(si);
	}, [account]);

	async function listServices() {
		const res = await crud.get("/service/list", { mechanic: account._id });
		if (res.error) toast.error(res.msg);
		else setServiceList(res.data);
		setLoading(false);
	}

	return (
		<div className="py-8">
			<div className="md:p-16 p-16 flex md:flex-row flex-col items-center md:justify-between gap-4">
				<h1 className="text-4xl font-semibold text-center md:text-left">
					Mechanic Dashboard
				</h1>
				<div className="flex gap-4">
					<div className="p-4 bg-neutral-300 ring ring-primary rounded">
						{mechanic.service} Services
					</div>
					<div className="p-4 bg-neutral-300 ring ring-primary rounded">
						{mechanic.amount} Earnings
					</div>
					<div className="p-4 bg-neutral-300 ring ring-primary rounded">
						{mechanic.rating / mechanic.service} Ratings
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center md:p-8 p-4 gap-8">
				{loading ? (
					<Loading className="w-40 h-40" />
				) : (
					<div className="flex flex-col justify-center items-center gap-4 md:p-8 p-4 w-full">
						{serviceList.map((service) => (
							<MechanicCard key={service._id} serviceT={service} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function MechanicCard({ name, type, vehicle, serviceT }) {
	const [service, setService] = useState(serviceT);
	const [paymentModal, setPaymentModal] = useState(false);
	const [amount, setAmount] = useState(0);

	useEffect(() => setService(serviceT), [serviceT]);

	async function updateBooking(status) {
		const backup = JSON.parse(JSON.stringify(service));
		setService({
			...service,
			mechanic: service.mechanic,
			user: service.user,
			status: status,
			rating: -1,
		});
		toast.success("Booking " + status);

		const res = await crud.put("/service/" + service._id, null, {
			status: status,
			rating: status == "Rejected" ? -1 : 0,
		});
		if (res.error) {
			toast.error(res.msg);
			setService(backup);
		}
	}

	async function updateAmount() {
		const backup = JSON.parse(JSON.stringify(service));
		setService({
			...service,
			mechanic: service.mechanic,
			user: service.user,
			amount: amount,
		});
		toast.success("Amount Updated");

		const res = await crud.put("/service/" + service._id, null, {
			amount: amount,
		});
		if (res.error) {
			toast.error(res.msg);
			setService(backup);
		}
	}

	async function pay() {
		const backup = JSON.parse(JSON.stringify(service));
		setService({
			...service,
			mechanic: service.mechanic,
			user: service.user,
			status: "Completed",
		});
		toast.success("Payment Completed");
		setPaymentModal(false);

		const res = await crud.put("/service/" + service._id, null, {
			status: "Completed",
		});
		if (res.error) {
			toast.error(res.msg);
			setService(backup);
		} else {
		}
	}

	return (
		<div className="bg-white p-4 rounded shadow-lg w-full flex md:flex-row flex-col justify-between items-center gap-2">
			<Modal isOpen={paymentModal}>
				{service.amount > 0 ? (
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
								Accept Payment
							</button>
						</div>
					</div>
				) : (
					<div className="bg-white p-4 flex flex-col justify-center items-center gap-8 mx-4 md:m-auto">
						<input
							type="number"
							className="ring-black ring-1 rounded px-4 py-2"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<button
							className="w-full rounded px-4 py-2 bg-primary"
							onClick={updateAmount}
						>
							Reqest Payment
						</button>
					</div>
				)}
			</Modal>
			<div className="flex flex-col w-full text-sm">
				<div className="flex mb-2 w-full justify-between md:justify-normal items-center gap-4">
					<h2 className="text-lg font-semibold">{service.user.name}</h2>
					<h2 className="px-8 py-1.5 ml-1 bg-primary rounded-full text-white">
						{service.status}
					</h2>
				</div>
				<p className="text-sm">Vehicle: {service.vehicle}</p>
				<p className="text-sm">
					Type:{" "}
					{service && service.skill && service.skill.toUpperCase() + " Wheeler"}
				</p>
				<p className="text-sm">Number Plate: {service.plate}</p>
				<p className="text-sm">Problem: {service.description}</p>
			</div>
			{service.status == "Requested" && (
				<div className="flex w-full md:w-auto">
					<button
						className="bg-primary text-white p-2 rounded w-full md:w-[100px] m-2"
						onClick={() => updateBooking("Ongoing")}
					>
						Accept
					</button>
					<button
						className="bg-primary text-white p-2 rounded w-full md:w-[100px] m-2"
						onClick={() => updateBooking("Rejected")}
					>
						Reject
					</button>
				</div>
			)}

			{service.status == "Ongoing" && (
				<div className="flex w-full md:w-auto">
					<a
						className="bg-primary text-center text-white p-2 rounded w-full md:w-[100px] m-2"
						href={"tel:" + service.user.phone}
					>
						Call
					</a>
					<button
						className="bg-primary text-white p-2 rounded w-full md:w-[100px] m-2"
						onClick={() => setPaymentModal(true)}
					>
						Payment
					</button>
				</div>
			)}

			{service.status != "Requested" && service.status != "Ongoing" && (
				<div className="flex flex-col justify-center items-center gap-1 w-full md:w-auto">
					<h1 className="text-lg font-semibold">Amount: {service.amount}</h1>
					<div className="">
						<Rating
							readonly={true}
							initialValue={Math.max(0, service.rating)}
							SVGstyle={{ display: "inline-block" }}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default MechanicsPage;
