import { create } from "zustand";

export interface Account {
	phone: string;
	name: string;
	pass?: string;
	type: string;
	skill?: string;
	created: Date;
	updated: Date;
	archive: boolean;
}

export interface AuthStore {
	token: string | null;
	account: Account | null;
	logout: () => void;
	login: (token: string, account: any) => void;
	load: () => void;
}

export const authStore = create<AuthStore>((set, get) => ({
	token: null,
	account: null,
	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("account");
		set({ token: null, account: null });
	},

	login: (token, account) => {
		localStorage.setItem("token", token);
		localStorage.setItem("account", JSON.stringify(account));
		set({ token, account: account });
	},

	load: () => {
		const token = localStorage.getItem("token");
		const account = JSON.parse(localStorage.getItem("account"));
		set({ token, account });
	},
}));
