import type { ACCESS_TOKEN } from "src/app/shared/constants";

import type { UserEntity } from "../../../../graphql";
import type { DeepPartial } from "../../../shared/interfaces";

export interface IAuthState {
	user?: DeepPartial<UserEntity>;
	[ACCESS_TOKEN]?: string;
}
