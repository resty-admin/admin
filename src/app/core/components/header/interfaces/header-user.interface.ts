import type { UserEntity } from "@graphql";

export interface IHeaderUser {
	id: UserEntity["id"];
	name: UserEntity["name"];
	role: UserEntity["role"];
}
