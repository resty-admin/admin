import type { UserEntity } from "@graphql";

export interface IUserToSelect {
	id: UserEntity["id"];
	name: UserEntity["name"];
}
