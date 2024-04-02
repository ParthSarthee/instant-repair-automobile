import React from "react";

function Navbar() {
	return (
		<div className="flex justify-between px-8 py-2 items-center bg-neutral-900">
			<img src="/logo.png" width="50" height="16" className="rounded" />
			<button className="bg-primary text-black px-4 py-2 font-semibold rounded">
				Login
			</button>
		</div>
	);
}

export default Navbar;
