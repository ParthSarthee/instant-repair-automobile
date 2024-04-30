const { stringify } = require("querystring");
import { task } from "./task";
// const api = "http://localhost:6800";
const api = "https://apix.aroxbit.com/5007";
import { authStore } from "@/stores/authStore";

export type CrudResponse = {
	code: number;
	data: any;
	msg: string | null;
	error: boolean;
};

const request = async function (
	type: "GET" | "POST" | "PUT" | "DELETE",
	endpoint: string,
	body?: any,
	headers: any = {}
): Promise<CrudResponse> {
	// const token = localStorage.getItem("token");
	// if (token) headers["x-auth-token"] = token;

	const token = authStore.getState().token;
	if (token) headers["x-auth-token"] = token;

	const requestOptions = {
		method: type,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
	};

	try {
		const response = await fetch(endpoint, requestOptions);
		const code = response.status;
		const data = await response.json();
		if (response.ok) return { code, data: data.obj, msg: null, error: false };
		else return { code, data: null, msg: data.obj, error: true };
	} catch (error) {
		console.error("Error making API request:", error.message);
		return { code: 600, data: null, msg: error.message, error: true };
		throw error; // You can handle errors in your own way
	}
};

const get = async function (
	route: string,
	query?,
	headers?
): Promise<CrudResponse> {
	const url = !query ? api + route : api + route + "?" + stringify(query);
	const [e, res] = await task(request("GET", url, null, headers));
	if (e) console.log(e);
	if (res) return res;
	else return undefined;
};

const post = async function (
	route: string,
	query?,
	body?,
	headers?
): Promise<CrudResponse> {
	const url = !query ? api + route : api + route + "?" + stringify(query);
	const [e, res] = await task(request("POST", url, body, headers));
	if (e) console.log(e.message);
	if (res) return res;
	else return undefined;
};

const put = async function (
	route: string,
	query?,
	body?,
	headers?
): Promise<CrudResponse> {
	const url = !query ? api + route : api + route + "?" + stringify(query);
	const [e, res] = await task(request("PUT", url, body, headers));
	if (e) console.log(e);
	if (res) return res;
	else return undefined;
};

const del = async function (
	route: string,
	query?,
	headers?
): Promise<CrudResponse> {
	const url = !query ? api + route : api + route + "?" + stringify(query);
	const [e, res] = await task(request("DELETE", url));
	if (e) console.log(e);
	if (res) return res;
	else return undefined;
};

const putS3 = async function (
	presignedURL: string,
	file,
	s3auth: "public-read" | "private" = "public-read"
): Promise<CrudResponse> {
	const requestOptions = {
		method: "PUT",
		headers: {
			"Content-Type": file.type,
			"x-amz-acl": s3auth,
		},
		body: file,
	};
	try {
		const response = await fetch(presignedURL, requestOptions);
		const code = response.status;
		if (response.ok) return { code, data: "ok", msg: null, error: false };
		else
			return {
				code,
				data: null,
				msg: "An error occured while uploading the file",
				error: true,
			};
	} catch (error) {
		console.error("Error making API request:", error.message);
		return { code: 600, data: null, msg: error.message, error: true };
		throw error; // You can handle errors in your own way
	}
};

const crud = { request, get, post, put, del, putS3 };
export default crud;
