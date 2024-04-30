import React from "react";

function MechanicsPage() {
	return (
		<div className="py-8">
			<div className="flex flex-col justify-center items-center p-8 gap-8">
				<h1 className="text-4xl font-semibold">Customer History</h1>
				<div className="flex flex-col justify-center items-center gap-4 p-8 w-full">
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
					<MechanicCard
						name="John Doe"
						type="Two Wheeler"
						vehicle={"Alto 800 (UP45 3255)"}
					/>
				</div>
			</div>
		</div>
	);
}

function MechanicCard({ name, type, vehicle }) {
	return (
		<div className="bg-white p-4 rounded shadow-lg w-full flex justify-between items-center">
			<div className="flex flex-col">
				<h2 className="text-xl font-semibold">{name}</h2>
				<p className="text-sm">{type}</p>
				<p className="text-sm">Vehicle: {vehicle}</p>
				<p className="text-sm">Problem: {"Vehicle is not starting"}</p>
			</div>
			<div>
				<button className="bg-primary text-white p-2 rounded w-[100px] m-2">
					Call
				</button>
				<button className="bg-primary text-white p-2 rounded w-[100px] m-2">
					Payment
				</button>
			</div>
		</div>
	);
}

export default MechanicsPage;
