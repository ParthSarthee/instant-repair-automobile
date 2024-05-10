"use client";
import { useEffect } from "react";
import { authStore } from "@/stores/authStore";
import { useRouter, usePathname } from "next/navigation";
import crud from "@/plugins/crud";

export function Navgaurd() {
	const authAccount = authStore((state) => state.account);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		crud.get("/auth/ping");
	}, []);

	// Protect routes
	useEffect(() => {
		if (!authAccount && localStorage.getItem("account"))
			authStore.getState().load();

		//Check if authAccount type is user
		if (authAccount && authAccount.type == "user" && pathname == "/mechanic") {
			router.push("/");
		}

		//Check if authAccount type is superadmin
		if (
			authAccount &&
			authAccount.type == "mechanic" &&
			pathname == "/service"
		) {
			router.push("/mechanic");
		}

		//Check if authAccount type is admin
		// if (authAccount && authAccount.type == "admin") {
		// 	router.push("/admin");
		// }
	}, [authAccount, router, pathname]);

	return null;
}
