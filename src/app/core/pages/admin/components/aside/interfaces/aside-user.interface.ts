import type { UserEntity } from "../../../../../../../graphql";

export interface IAsideUser {
	id: UserEntity["id"];
	name: UserEntity["name"];
	role: UserEntity["role"];
}
