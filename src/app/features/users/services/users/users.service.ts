import { Injectable } from "@angular/core";

import type { CreateUserInput, UpdateUserInput } from "../../../../../graphql";
import { CreateUserGQL, DeleteUserGQL, UpdateUserGQL } from "../../graphql/users";

@Injectable({ providedIn: "root" })
export class UsersService {
	constructor(
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL
	) {}

	createUser(user: CreateUserInput) {
		return this._createUserGQL.mutate({ user });
	}

	updateUser(user: UpdateUserInput) {
		return this._updateUserGQL.mutate({ user });
	}

	deleteUser(userId: string) {
		return this._deleteUserGQL.mutate({ userId });
	}
}
