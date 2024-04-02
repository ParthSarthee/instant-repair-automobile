import React from "react";
import Link from "next/link";

function Navbar() {
	return (
		<div className="flex justify-between px-8 py-2 items-center bg-neutral-900">
			<Link href="/">
				<img src="/logo.png" width="50" height="16" className="rounded" />
			</Link>
			<Link href="/">
				<button className="bg-primary text-black px-4 py-2 font-semibold rounded">
					Login
				</button>
			</Link>
		</div>
	);
}

export default Navbar;
