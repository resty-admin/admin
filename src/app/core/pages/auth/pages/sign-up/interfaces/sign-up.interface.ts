import type { UserRoleEnum } from "../../../../../../../graphql";

export interface ISignUp {
	email: string;
	tel: string;
	password: string;
	role: UserRoleEnum;
}
