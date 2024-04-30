"use client";
import { use, useEffect, useLayoutEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { authStore } from "@/stores/authStore";
import toast from "react-hot-toast";

export function Navgaurd() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const authAccount = authStore((state) => state.account);

	// Protect routes
	useEffect(() => {
		// const url = `${pathname}?${searchParams}`;

		//

		if (!authAccount && localStorage.getItem("account"))
			authStore.getState().load();

		// if (!authUser && localStorage.getItem("user")) {
		// 	toast.success("Logged in!");
		// 	const user = JSON.parse(localStorage.getItem("user"));
		// 	const token = localStorage.getItem("token");
		// 	authStore.setState({ user, token });

		// 	if (pathname.indexOf("login") >= 0) {
		// 		if (user.type == "admin") {
		// 			router.push("/admin/dashboard");
		// 			return;
		// 		} else {
		// 			router.push("/app/swipe");
		// 			return;
		// 		}
		// 	}
		// } else if (
		// 	!authUser &&
		// 	pathname.indexOf("admin") >= 0 &&
		// 	pathname.indexOf("login") < 0
		// ) {
		// 	router.push("/admin/login");
		// 	return;
		// } else if (
		// 	!authUser &&
		// 	pathname.indexOf("app") >= 0 &&
		// 	pathname.indexOf("login") < 0
		// ) {
		// 	router.push("/app/login");
		// 	return;
		// }

		// if (authUser && pathname.indexOf("login") >= 0) {
		// 	// toast.success("Logged in!");
		// 	if (authUser.type == "admin") {
		// 		router.push("/admin/dashboard");
		// 		return;
		// 	} else {
		// 		router.push("/app/swipe");
		// 		return;
		// 	}
		// }
	}, [authAccount, pathname, searchParams, router]);

	return null;
}
