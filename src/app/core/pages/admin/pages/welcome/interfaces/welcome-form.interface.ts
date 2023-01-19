import type { UserEntity } from "../../../../../../../graphql";

export interface IWelcomeForm {
	name?: UserEntity["name"];
	tel?: UserEntity["tel"];
	email?: UserEntity["email"];
}
