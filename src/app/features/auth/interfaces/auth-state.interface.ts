import type { UserEntity } from "@graphql";
import type { ACCESS_TOKEN } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";

export interface IAuthState {
	user?: DeepPartial<UserEntity>;
	[ACCESS_TOKEN]?: string;
}
