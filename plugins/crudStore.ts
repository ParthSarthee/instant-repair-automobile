import crud, { CrudResponse } from "@/plugins/crud";
const isLoading = { loading: true, error: false, msg: "" };

type SetLoading = undefined | null | { (loading: boolean): void };

export interface CrudStore {
	one: any;
	list: any[];
	count: number;
	loading: boolean;
	error: boolean;
	msg: string;

	getOne: (uid: string, setLoading?: SetLoading) => Promise<CrudResponse>;
	getList: (query?: any, setLoading?: SetLoading) => Promise<CrudResponse>;
	getCount: (query?: any, setLoading?: SetLoading) => Promise<CrudResponse>;
	create: (data?: any, setLoading?: SetLoading) => Promise<CrudResponse>;
	update: (
		uid: string,
		data: any,
		setLoading?: SetLoading
	) => Promise<CrudResponse>;
	archive: (uid: string, setLoading?: SetLoading) => Promise<CrudResponse>;
	delete: (uid: string, setLoading?: SetLoading) => Promise<CrudResponse>;
	reset: (options?: Partial<CrudStore>) => void;
}

export const crudStore = ({ api = "", set, get }) => ({
	one: {},
	list: [],
	count: -1,
	loading: false,
	error: false,
	msg: "", //error message

	getOne: async (uid: string, setLoading?: SetLoading) => {
		// check for uid in list[]
		const list = get().list;
		const one = list.find((place) => place._id == uid);
		if (one) {
			set({ one });
			return { code: 200, data: one, msg: "", error: false };
		}

		// check for uid in one
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.get(`${api}/one/${uid}`);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else set({ one: response.data, loading: false });
		if (setLoading) setLoading(false);
		return response;
	},

	getList: async (query: any = {}, setLoading?: SetLoading) => {
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.get(`${api}/list`, query);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else set({ list: response.data, loading: false });
		if (setLoading) setLoading(false);
		return response;
	},

	getCount: async (query: any = {}, setLoading?: SetLoading) => {
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.get(`${api}/count`, query);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else set({ count: response.data, loading: false });
		if (setLoading) setLoading(false);
		return response;
	},

	create: async (data: any = {}, setLoading?: SetLoading) => {
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.post(api, null, data);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else
			set({
				one: response.data,
				loading: false,
				list: [response.data, ...get().list],
			});
		if (setLoading) setLoading(false);
		return response;
	},

	update: async (uid: string, data: any = {}, setLoading?: SetLoading) => {
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.put(`${api}/${uid}`, null, data);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else {
			const list = get().list;
			const index = list.findIndex((elmnt) => elmnt._id == uid);
			if (index >= 0) list[index] = response.data;
			set({ one: response.data, loading: false, list });
		}
		if (setLoading) setLoading(false);
		return response;
	},

	archive: async (uid: string, setLoading?: SetLoading) => {
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.del(`${api}/${uid}`);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else {
			const list = get().list;
			const index = list.findIndex((elmnt) => elmnt._id == uid);
			if (index >= 0) list.splice(index, 1);
			set({ one: response.data, loading: false, list });
		}
		if (setLoading) setLoading(false);
		return response;
	},

	delete: async (uid: string, setLoading?: SetLoading) => {
		set(isLoading);
		if (setLoading) setLoading(true);
		const response = await crud.del(`${api}/permanent/${uid}`);
		if (response.error) set({ loading: false, error: true, msg: response.msg });
		else {
			const list = get().list;
			const index = list.findIndex((elmnt) => elmnt._id == uid);
			if (index >= 0) list.splice(index, 1);
			set({ one: {}, loading: false, list });
		}
		if (setLoading) setLoading(false);
		return response;
	},

	reset: (options = {}) =>
		set({
			loading: false,
			error: false,
			msg: "",
			...options,
		}),
});
