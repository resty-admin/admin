import type { CommandEntity } from "../../../../../../graphql";

export interface ICommandForm {
	name: CommandEntity["name"];
	description: CommandEntity["description"];
}
