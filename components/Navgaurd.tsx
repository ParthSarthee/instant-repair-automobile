"use client";
import { useEffect } from "react";
import { authStore } from "@/stores/authStore";

export function Navgaurd() {
	const authAccount = authStore((state) => state.account);

	// Protect routes
	useEffect(() => {
		if (!authAccount && localStorage.getItem("account"))
			authStore.getState().load();
	}, [authAccount]);

	return null;
}
