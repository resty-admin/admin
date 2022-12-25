import type { ACCESS_TOKEN } from "src/app/shared/constants";
import type { IUser } from "src/app/shared/interfaces";

export interface IAuthState {
	user?: IUser;
	[ACCESS_TOKEN]?: string;
}
