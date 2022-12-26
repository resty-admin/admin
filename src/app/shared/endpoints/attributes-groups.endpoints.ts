import { DYNAMIC_ID } from "../constants";

export const ATTRIBUTES_GROUPS_ENDPOINTS = {
	CREATE_ATTRIBUTES_GROUP: "attributes-group",
	UPDATE_ATTRIBUTES_GROUP: `attributes-group/${DYNAMIC_ID}`,
	DELETE_ATTRIBUTES_GROUP: `attributes-group/${DYNAMIC_ID}`
};
