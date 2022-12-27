import { DYNAMIC_ID } from "../constants";

export const ATTRIBUTES_GROUPS_ENDPOINTS = {
	CREATE_ATTRIBUTES_GROUP: "attribute-groups",
	UPDATE_ATTRIBUTES_GROUP: `attribute-groups/${DYNAMIC_ID}`,
	DELETE_ATTRIBUTES_GROUP: `attribute-groups/${DYNAMIC_ID}`
};
