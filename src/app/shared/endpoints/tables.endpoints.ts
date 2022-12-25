import { DYNAMIC_ID } from "../constants";

export const TABLES_ENDPOINTS = {
	CREATE_TABLE: "tables",
	UPDATE_TABLE: `tables/${DYNAMIC_ID}`,
	DELETE_TABLE: `tables/${DYNAMIC_ID}`
};
