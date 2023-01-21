import type { UserEntity } from "@graphql";

export interface IAddEmployeeForm {
	email: UserEntity["email"];
	tel: UserEntity["tel"];
}
