import type { UserEntity } from "../../../../../../graphql";

export interface IUserForm {
	name: UserEntity["name"];
	email: UserEntity["email"];
	password: UserEntity["password"];
	tel: UserEntity["tel"];
	role: UserEntity["role"];
}
