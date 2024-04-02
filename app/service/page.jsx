import React from "react";
import Link from "next/link";

function ServicePage() {
	return (
		<div className="py-8">
			<div className="flex flex-col justify-center items-center p-8 gap-8">
				<h1 className="text-4xl font-semibold">Choose A Service</h1>
				<div className="flex flex-wrap justify-center items-center gap-8">
					<div className="bg-white p-12 rounded shadow-lg flex flex-col justify-center items-center gap-2 text-primary">
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
						<h2>Two Wheelers</h2>
					</div>

					<div className="bg-white p-12 rounded shadow-lg flex flex-col justify-center items-center gap-2 text-primary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="72"
							height="72"
							viewBox="0 0 24 24"
							className="fill-primary"
						>
							<path d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H14V2h-4v2H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path>
						</svg>
						<h2>Three Wheelers</h2>
					</div>

					<div className="bg-white p-12 rounded shadow-lg flex flex-col justify-center items-center gap-2 text-primary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="72"
							height="72"
							viewBox="0 0 24 24"
							className="fill-primary"
						>
							<path d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path>
						</svg>
						<h2>Four Wheelers</h2>
					</div>

					<div className="bg-white p-12 rounded shadow-lg flex flex-col justify-center items-center gap-2 text-primary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="72"
							height="72"
							viewBox="0 0 24 24"
							className="fill-primary"
						>
							<path d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 1 1.73 3.49 3.49 0 0 0 7 .27h3.1a3.48 3.48 0 0 0 6.9 0 2 2 0 0 0 2-2v-3a1.07 1.07 0 0 0-.14-.52zM15 9h2.43l1.8 3H15zM6.5 19A1.5 1.5 0 1 1 8 17.5 1.5 1.5 0 0 1 6.5 19zm10 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"></path>
						</svg>
						<h2>Heavy Vehicles</h2>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center p-8 gap-8">
				<h1 className="text-4xl font-semibold">Give More Details</h1>

				<div className="flex flex-col gap-4 bg-white p-8 rounded shadow-lg w-full max-w-screen-lg ">
					<div className="flex flex-col gap-1">
						<span>Vehicle & Brand Model: </span>
						<input
							type="text"
							placeholder="Enter Your Vehicle & Brand Model"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span>Vehicle Plate Number: </span>
						<input
							type="text"
							placeholder="Enter Your Vehicle Plate Number"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span>Description: </span>
						<textarea
							placeholder="Enter About Problem"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>
					<Link
						href="/mechanic"
						className=" text-center mt-4 bg-primary text-white px-4 py-2 font-semibold rounded"
					>
						Submit Details
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ServicePage;
