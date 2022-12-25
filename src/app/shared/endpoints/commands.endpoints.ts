import { DYNAMIC_ID } from "../constants";

export const COMMANDS_ENDPOINTS = {
	CREATE_COMMAND: "commands",
	UPDATE_COMMAND: `commands/${DYNAMIC_ID}`,
	DELETE_COMMAND: `commands/${DYNAMIC_ID}`
};
