import Image from "next/image";

export default function Home() {
	return (
		<>
			<Hero />
			<Services />
		</>
	);
}

function Hero() {
	return (
		<div className="flex flex-col md:flex-row justify-center items-center p-8 gap-8">
			<div className="w-full md:w-2/3 max-h-[500px] lg:max-w-[700px]">
				<img src="/hero.jpg" className="" />
			</div>

			<div className="md:w-1/3 w-full flex flex-col gap-4">
				<div className="flex flex-col gap-4 bg-white p-8 rounded shadow-lg">
					<div className="flex flex-col gap-1">
						<span>Email: </span>
						<input
							type="text"
							placeholder="Enter Your Email"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span>Password: </span>
						<input
							type="password"
							placeholder="Enter A Password"
							className="ring-black ring-1 rounded px-4 py-2"
						/>
					</div>
					<button className="mt-4 bg-primary text-white px-4 py-2 font-semibold rounded">
						Login
					</button>
				</div>
				<div className="flex justify-center items-center flex-col">
					<p>Explore Our Services</p>
					<button className="mt-4 bg-primary text-white px-4 py-2 font-semibold rounded w-full">
						Skip Login
					</button>
				</div>
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
					<img src="/card1.jpg" className="w-[400px]" />
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry standard dummy text ever
						since the 1500s, when an unknown printer took a galley.
					</p>
				</div>

				<div className="flex flex-col bg-white rounded justify-center items-center max-w-[400px] p-8 shadow-lg gap-4">
					<h1 className="text-3xl font-semibold text-primary">
						Doorstep Service
					</h1>
					<img src="/card1.jpg" className="w-[400px]" />
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry standard dummy text ever
						since the 1500s, when an unknown printer took a galley.
					</p>
				</div>
			</div>
		</>
	);
}
