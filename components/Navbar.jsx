"use client";
import React from "react";
import Link from "next/link";
import { authStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

function Navbar() {
	const account = authStore((state) => state.account);
	const router = useRouter();

	function logout() {
		authStore.getState().logout();
		router.push("/");
	}

	return (
		<div className="flex justify-between px-8 py-2 items-center bg-neutral-900 fixed top-0 w-full">
			<Link href="/" className="flex justify-center items-center gap-2">
				<img src="/logo.png" width="50" height="16" className="rounded" />
				<h1 className="text-primary text-4xl">IRA</h1>
			</Link>
			<div className="flex gap-2">
				<DropdownMenu />
				{account ? (
					<button
						className="bg-primary text-black px-4 py-2 font-semibold rounded"
						onClick={logout}
					>
						Logout
					</button>
				) : (
					<Link
						href="/"
						className="bg-primary text-black px-4 py-2 font-semibold rounded"
					>
						Login
					</Link>
				)}
			</div>
		</div>
	);
}

function DropdownMenu() {
	const [hidden, setHidden] = React.useState("hidden");
	const toggleDropdown = () => setHidden(hidden === "hidden" ? "" : "hidden");

	return (
		<div>
			<button
				className=" bg-primary text-black px-4 py-2 font-semibold rounded text-center inline-flex items-center "
				onClick={toggleDropdown}
			>
				More{" "}
				<svg
					className="w-2.5 h-2.5 ms-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>
			{/* Dropdown menu */}
			<div
				id="dropdown"
				className={
					"z-10 my-2 fixed bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 " +
					hidden
				}
			>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Option One
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Option Two
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Option Three
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
