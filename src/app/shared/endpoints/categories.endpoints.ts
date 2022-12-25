import { DYNAMIC_ID } from "../constants";

export const CATEGORIES_ENDPOINTS = {
	CREATE_CATEGORY: "categories",
	UPDATE_CATEGORY: `categories/${DYNAMIC_ID}`,
	DELETE_CATEGORY: `categories/${DYNAMIC_ID}`
};
