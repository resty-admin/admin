import type { UserEntity } from "@graphql";

export interface IProfileForm {
	name: UserEntity["name"];
	tel: UserEntity["tel"];
	email: UserEntity["email"];
}
