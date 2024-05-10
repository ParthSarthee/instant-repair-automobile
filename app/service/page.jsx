"use client";
import { useEffect, useState } from "react";
import crud from "@/plugins/crud";
import { task } from "@/plugins/task";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import {
	Input,
	Button,
	Select,
	Option,
	Textarea,
} from "@material-tailwind/react";

const cities = [
	"Phagwara",
	"Jalandhar",
	"Amritsar",
	"Ludhiana",
	"Pathankot",
	"Chandigarh",
	"Patna",
];

function ServicePage() {
	const [skill, setSkill] = useState("");
	const [service, setService] = useState(""); //instant and doorstep
	const [serviceData, setServiceData] = useState({
		skill: "",
		service: "",
		location: "",
		vehicle: "",
		plate: "",
		description: "",
	});

	useEffect(
		() => setServiceData({ ...serviceData, skill: skill, service: service }),
		[skill, service]
	);

	useEffect(() => console.log(serviceData), [serviceData]);

	return (
		<div className="py-8">
			<ServiceSelect service={service} setService={setService} />
			<SkillSelect skill={skill} setSkill={setSkill} />
			<ServiceForm serviceData={serviceData} setServiceData={setServiceData} />
			<MechanicList serviceData={serviceData} setServiceData={setServiceData} />
		</div>
	);
}

function ServiceSelect({ service, setService }) {
	return (
		<div
			className="flex flex-col justify-center items-center p-8 gap-8 md:h-screen pt-32"
			id="service"
		>
			<h1 className="text-4xl font-semibold">Select You Service</h1>
			<div className="flex flex-wrap justify-center items-center gap-8">
				<SCard
					setSkill={setService}
					skill={service}
					zkey="instant"
					title="Instant Service"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						viewBox="0 0 24 24"
						className="fill-primary"
					>
						<path d="M11 15.414V20h2v-4.586c0-.526-.214-1.042-.586-1.414l-2-2L13 9.414l2 2c.372.372.888.586 1.414.586H20v-2h-3.586l-3.707-3.707a.999.999 0 0 0-1.414 0L8 9.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l3 3z"></path>
						<circle cx="16" cy="5" r="2"></circle>
						<path d="M18 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM6 22c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path>
					</svg>
				</SCard>

				<SCard
					setSkill={setService}
					skill={service}
					zkey="doorstep"
					title="Doorstep Service"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						viewBox="0 0 24 24"
						className="fill-primary"
					>
						<path d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H14V2h-4v2H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path>
					</svg>
				</SCard>
			</div>
		</div>
	);
}

function SkillSelect({ skill, setSkill }) {
	return (
		<div
			className="flex flex-col justify-center items-center p-8 gap-8 md:h-screen pt-32"
			id="skill"
		>
			<h1 className="text-4xl font-semibold">Select Your Vehicle</h1>
			<div className="flex flex-wrap justify-center items-center gap-8">
				<SCard setSkill={setSkill} skill={skill} zkey="two" title="Two Wheeler">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						viewBox="0 0 24 24"
						className="fill-primary"
					>
						<path d="M11 15.414V20h2v-4.586c0-.526-.214-1.042-.586-1.414l-2-2L13 9.414l2 2c.372.372.888.586 1.414.586H20v-2h-3.586l-3.707-3.707a.999.999 0 0 0-1.414 0L8 9.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l3 3z"></path>
						<circle cx="16" cy="5" r="2"></circle>
						<path d="M18 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM6 22c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path>
					</svg>
				</SCard>

				<SCard
					setSkill={setSkill}
					skill={skill}
					zkey="three"
					title="Three Wheeler"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						viewBox="0 0 24 24"
						className="fill-primary"
					>
						<path d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H14V2h-4v2H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path>
					</svg>
				</SCard>

				<SCard
					setSkill={setSkill}
					skill={skill}
					zkey="four"
					title="Four Wheeler"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						viewBox="0 0 24 24"
						className="fill-primary"
					>
						<path d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path>
					</svg>
				</SCard>

				<SCard
					setSkill={setSkill}
					skill={skill}
					zkey="heavy"
					title="Heavy Vehicle"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						viewBox="0 0 24 24"
						className="fill-primary"
					>
						<path d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 1 1.73 3.49 3.49 0 0 0 7 .27h3.1a3.48 3.48 0 0 0 6.9 0 2 2 0 0 0 2-2v-3a1.07 1.07 0 0 0-.14-.52zM15 9h2.43l1.8 3H15zM6.5 19A1.5 1.5 0 1 1 8 17.5 1.5 1.5 0 0 1 6.5 19zm10 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"></path>
					</svg>
				</SCard>
			</div>
		</div>
	);
}

function SCard({ title, children, skill, setSkill, zkey }) {
	const [extraClass, setExtraClass] = useState(" bg-white");
	useEffect(() => {
		skill == zkey ? setExtraClass("bg-neutral-800") : setExtraClass("bg-white");
	}, [skill, zkey]);

	function cardSelected() {
		setSkill(zkey);
		let temp = "form";
		if (zkey == "instant" || zkey == "doorstep") temp = "skill";
		document.getElementById(temp).scrollIntoView({ behavior: "smooth" });
	}

	return (
		<div
			className={
				"p-12 rounded-lg shadow-lg flex flex-col justify-center items-center gap-2 text-primary cursor-pointer hover:scale-105 hover:ring-1 hover:ring-primary " +
				extraClass
			}
			onClick={cardSelected}
		>
			{children}
			<h2>{title}</h2>
		</div>
	);
}

function ServiceForm({ serviceData, setServiceData }) {
	return (
		<div
			className="flex flex-col justify-center items-center p-8 gap-8 md:h-screen pt-32"
			id="form"
		>
			<h1 className="text-4xl font-semibold">Give More Details</h1>

			<div className="flex flex-col gap-6 bg-white p-8 rounded-lg pt-12 ring-1 ring-primary shadow-lg w-full max-w-screen-lg ">
				<div className="flex flex-col gap-1">
					<Select
						type="text"
						placeholder="Your City"
						label="Your City"
						onChange={(e) => setServiceData({ ...serviceData, location: e })}
						value={serviceData.location}
					>
						{cities.map((city) => (
							<Option key={city} value={city}>
								{city}
							</Option>
						))}
					</Select>
				</div>
				<div className="flex flex-col gap-1">
					<Input
						type="text"
						placeholder="Vehicle Brand & Model"
						label="Vehicle Brand & Model"
						onChange={(e) =>
							setServiceData({ ...serviceData, vehicle: e.target.value })
						}
						value={serviceData.vehicle}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<Input
						type="text"
						placeholder="Vehicle Plate Number"
						label="Vehicle Plate Number"
						onChange={(e) =>
							setServiceData({ ...serviceData, plate: e.target.value })
						}
						value={serviceData.plate}
					/>
				</div>
				{serviceData.service && serviceData.service == "doorstep" && (
					<div className="flex flex-col gap-1">
						<Input
							type="datetime-local"
							placeholder="Booking Time Slot"
							label="Booking Time Slot"
							onChange={(e) =>
								setServiceData({ ...serviceData, slot: e.target.value })
							}
						/>
					</div>
				)}
				<div className="flex flex-col gap-1">
					<Textarea
						// placeholder="Describe The Problem"
						label="Describe The Problem"
						onChange={(e) =>
							setServiceData({ ...serviceData, description: e.target.value })
						}
						value={serviceData.description}
					/>
				</div>
				<Button
					className="bg-primary hover:bg-primary-light text-white w-full"
					onClick={() =>
						document
							.getElementById("list")
							.scrollIntoView({ behavior: "smooth" })
					}
				>
					Find Mechanic
				</Button>
			</div>
		</div>
	);
}

function MechanicList({ serviceData, setServiceData }) {
	const [mechanics, setMechanics] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const res = await crud.get("/account/list", {
				location: serviceData.location,
				skill: serviceData.skill,
			});
			if (res.error) toast.error(res.error);
			else setMechanics(res.data);
			setLoading(false);
		})();
	}, [serviceData]);

	return (
		<div className="pt-32" id="list">
			<div className="flex flex-col justify-center items-center p-8 gap-8">
				<h1 className="text-4xl font-semibold">Choose A Mechanic</h1>
				<div className="flex flex-col justify-center items-center gap-4 p-8 w-full">
					{loading && <Loading className="w-20 h-20" />}
					{!loading && mechanics.length == 0 && <p>No Mechanics Found!</p>}
					{mechanics.map((mechanic) => (
						<MechanicCard
							uid={mechanic._id}
							key={mechanic._id}
							name={mechanic.name}
							skill={mechanic.skill}
							location={mechanic.location}
							rating={mechanic.rating}
							service={mechanic.service}
							serviceData={serviceData}
							setServiceData={setServiceData}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function MechanicCard({
	name,
	skill,
	location,
	rating,
	service,
	uid,
	serviceData,
	setServiceData,
}) {
	const router = useRouter();

	async function createServiceRequest() {
		const tempData = { ...serviceData, mechanic: uid };

		//check if all the data is filles
		if (!serviceData.service) {
			toast.error("Please select your service type");
			document.getElementById("service").scrollIntoView({ behavior: "smooth" });
		} else if (!serviceData.skill) {
			toast.error("Please select your vehicle type");
			document.getElementById("skill").scrollIntoView({ behavior: "smooth" });
		} else if (
			!serviceData.location ||
			!serviceData.vehicle ||
			!serviceData.plate ||
			!serviceData.description
		) {
			toast.error("Please fill all the details");
			document.getElementById("form").scrollIntoView({ behavior: "smooth" });
		} else {
			// create a service request
			const res = await crud.post("/service", null, tempData);
			if (res.error) toast.error(res.msg);
			else toast.success("Service Request Successfull!");
			console.log(res);
			router.push("/");
		}
		// disable all ui elements
		//create a backend request
		//enable all ui elements
		//show a toast message
		//redirect to dashboard
	}

	return (
		<div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-5xl flex justify-between items-center hover:scale-105 hover:ring-1 hover:ring-primary">
			<div className="flex flex-col">
				<h2 className="text-xl font-semibold">{name}</h2>
				{/* <p className="text-sm">{skill}</p> */}
				<p className="text-sm">{location}</p>
				<p className="text-sm">Rating: {(rating / service).toFixed(1)}</p>
			</div>
			<div>
				<Button color="green" onClick={createServiceRequest}>
					Book
				</Button>
			</div>
		</div>
	);
}

export default ServicePage;
