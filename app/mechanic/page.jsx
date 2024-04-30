import React from "react";

function MechanicList() {
	return (
		<div className="py-8">
			<div className="flex flex-col justify-center items-center p-8 gap-8">
				<h1 className="text-4xl font-semibold">Choose A Mechanic</h1>
				<div className="flex flex-col justify-center items-center gap-4 p-8 w-full">
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
					<MechanicCard name="John Doe" type="Two Wheeler" rating={4.5} />
				</div>
			</div>
		</div>
	);
}

function MechanicCard({ name, type, rating }) {
	return (
		<div className="bg-white p-4 rounded shadow-lg w-full flex justify-between items-center">
			<div className="flex flex-col">
				<h2 className="text-xl font-semibold">{name}</h2>
				<p className="text-sm">{type}</p>
				<p className="text-sm">Rating: {rating}</p>
			</div>
			<div>
				<button className="bg-primary text-white p-2 rounded w-[100px]">
					Book
				</button>
			</div>
		</div>
	);
}

export default MechanicList;
