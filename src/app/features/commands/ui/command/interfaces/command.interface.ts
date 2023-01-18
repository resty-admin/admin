import type { CommandEntity } from "../../../../../../graphql";

export interface ICommand {
	name: CommandEntity["name"];

	description: CommandEntity["description"];
}
