import type { ACCESS_TOKEN } from "src/app/shared/constants";

export interface IAuthState {
	user?: any;
	[ACCESS_TOKEN]?: string;
}
