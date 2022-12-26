import { DYNAMIC_ID } from "../constants";

export const ATTRIBUTES_ENDPOINTS = {
	CREATE_ATTRIBUTE: "attributes",
	UPDATE_ATTRIBUTE: `attributes/${DYNAMIC_ID}`,
	DELETE_ATTRIBUTE: `attributes/${DYNAMIC_ID}`
};
