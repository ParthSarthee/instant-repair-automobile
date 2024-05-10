"use client";
import React from "react";
import Link from "next/link";
import { authStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

function Navbar() {
	const account = authStore((state) => state.account);
	const router = useRouter();

	function logout() {
		authStore.getState().logout();
		router.push("/");
	}

	return (
		<div className="flex justify-between px-8 py-2 items-center bg-neutral-900 fixed top-0 w-full z-50">
			<Link href="/" className="flex justify-center items-center gap-2">
				<img src="/logo.png" width="50" height="16" className="rounded" />
				<h1 className="text-primary h1-orange text-4xl">IRA</h1>
			</Link>
			<div className="flex gap-2">
				<DropdownMenu />
				{account ? (
					<Button
						className="bg-primary text-black hover:bg-primary-light hover:text-white"
						onClick={logout}
					>
						Logout
					</Button>
				) : (
					<Link href="/">
						<Button className="bg-primary text-black hover:bg-primary-light hover:text-white">
							Login
						</Button>
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
			<Button
				className=" bg-primary text-black flex items-center hover:bg-primary-light hover:text-white"
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
			</Button>
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
						<Link
							href="/about"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							About
						</Link>
					</li>
					<li>
						<Link
							href="/about#faq"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							FAQs
						</Link>
					</li>
					<li>
						<Link
							href="/about#review"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Review
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
