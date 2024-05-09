"use client";
import crud from "@/plugins/crud";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { Rating } from "react-simple-star-rating";

function AdminPage() {
	const [loading, setLoading] = useState(true);
	const [counts, setCounts] = useState({});
	const [serviceList, setServiceList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [mechanicList, setMechanicList] = useState([]);
	const [tab, setTab] = useState("service");

	useEffect(() => {
		(async () => {
			const res = await crud.get("/auth/admin/");
			console.log(res);
			if (res.error) console.log(res.msg);
			else {
				setCounts({
					service: res.data.service,
					user: res.data.user,
					mechanic: res.data.mechanic,
					amount: res.data.amount,
				});
				setServiceList(res.data.serviceList);
				setUserList(res.data.userList);
				setMechanicList(res.data.mechanicList);
			}
			setLoading(false);
		})();
	}, []);

	return (
		<div className="py-8">
			<div className="md:p-16 p-16 flex md:flex-row flex-col items-center md:justify-between gap-4">
				<h1 className="text-4xl font-semibold text-center md:text-left">
					Admin Dashboard
				</h1>
				<div className="flex gap-4">
					<div
						className={
							"p-4 bg-neutral-300 ring ring-primary rounded cursor-pointer" +
							(tab == "service" ? " bg-primary text-white" : "")
						}
						onClick={() => setTab("service")}
					>
						{counts.service} Services
					</div>
					<div
						className={
							"p-4 bg-neutral-300 ring ring-primary rounded cursor-pointer" +
							(tab == "user" ? " bg-primary text-white" : "")
						}
						onClick={() => setTab("user")}
					>
						{counts.user} Users
					</div>
					<div
						className={
							"p-4 bg-neutral-300 ring ring-primary rounded cursor-pointer" +
							(tab == "mechanic" ? " bg-primary text-white" : "")
						}
						onClick={() => setTab("mechanic")}
					>
						{counts.mechanic} Mechanics
					</div>
					<div className="p-4 bg-neutral-300 ring ring-primary rounded">
						{counts.amount} Amount
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center md:p-8 p-4 gap-8">
				{loading ? (
					<Loading className="w-40 h-40" />
				) : (
					<>
						{tab == "service" && (
							<div className="flex flex-col justify-center items-center gap-4 md:p-8 p-4 w-full">
								{serviceList.map((service) => (
									<ServiceCard key={service._id} service={service} />
								))}
							</div>
						)}

						{tab == "mechanic" && (
							<div className="flex flex-col justify-center items-center gap-4 md:p-8 p-4 w-full">
								{mechanicList.map((account) => (
									<AccountCard key={account._id} account={account} />
								))}
							</div>
						)}

						{tab == "user" && (
							<div className="flex flex-col justify-center items-center gap-4 md:p-8 p-4 w-full">
								{userList.map((account) => (
									<AccountCard key={account._id} account={account} />
								))}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

function ServiceCard({ service }) {
	return (
		<div className="bg-white p-4 rounded shadow-lg w-full flex md:flex-row flex-col justify-between items-center gap-2">
			<div className="flex flex-col w-full text-sm">
				<div className="flex mb-2 w-full justify-between md:justify-normal items-center gap-4">
					<h2 className="px-8 py-1.5 ml-1 bg-primary rounded-full text-white">
						{service.status}
					</h2>
				</div>
				<p>User: {service.user && service.user.name}</p>
				<p>Mechanic: {service.mechanic && service.mechanic.name}</p>
				<p className="text-sm">Vehicle: {service.vehicle}</p>
				<p className="text-sm">
					Type:{" "}
					{service && service.skill && service.skill.toUpperCase() + " Wheeler"}
				</p>
				<p className="text-sm">Number Plate: {service.plate}</p>
				<p className="text-sm">Problem: {service.description}</p>
			</div>

			{true && (
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

function AccountCard({ account }) {
	const [del, setDel] = useState("");
	const banAccount = async () => {
		setDel(" hidden");
		toast.success("Account Deleted");
		const res = await crud.del("/account/" + account._id);
		if (res.error) {
			toast.error(res.msg);
			setDel("");
		}
	};

	return (
		<div
			className={
				"bg-white p-4 rounded shadow-lg w-full flex md:flex-row flex-col justify-between items-center gap-2 " +
				del
			}
		>
			<div className="flex flex-col w-full text-sm">
				<div className="flex mb-2 w-full justify-between md:justify-normal items-center gap-4">
					<h2 className="px-8 py-1.5 ml-1 bg-primary rounded-full text-white">
						{account.type && account.type.toUpperCase()}
					</h2>
				</div>
				<p>Name: {account.name}</p>
				<p>Phone: {account.phone}</p>
			</div>

			{true && (
				<div className="flex flex-col justify-center items-center gap-1 w-full md:w-auto">
					<button className="bg-neutral-200 px-3 py-1.5" onClick={banAccount}>
						Ban
					</button>
				</div>
			)}
		</div>
	);
}

export default AdminPage;
