import { DYNAMIC_ID } from "../constants";

export const COMPANIES_ENDPOINTS = {
	BASE: "companies",
	CREATE_COMPANY: "companies",
	UPDATE_COMPANY: `companies/${DYNAMIC_ID}`,
	DELETE_COMPANY: `companies/${DYNAMIC_ID}`
};
