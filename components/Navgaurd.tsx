"use client";
import { useEffect } from "react";
import { authStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export function Navgaurd() {
	const authAccount = authStore((state) => state.account);
	const router = useRouter();

	// Protect routes
	useEffect(() => {
		if (!authAccount && localStorage.getItem("account"))
			authStore.getState().load();

		//Check if authAccount type is user
		if (authAccount && authAccount.type == "user") {
			router.push("/");
		}

		//Check if authAccount type is superadmin
		if (authAccount && authAccount.type == "mechanic") {
			router.push("/mechanic");
		}

		//Check if authAccount type is admin
		if (authAccount && authAccount.type == "admin") {
			router.push("/admin");
		}
	}, [authAccount]);

	return null;
}
