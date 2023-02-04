import { Injectable } from "@angular/core";
import type { CreateUserInput, UpdateUserInput, UserToPlaceInput } from "@graphql";

import { AddUserToPlaceGQL, CreateUserGQL, DeleteUserGQL, UpdateUserGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class UsersService {
	constructor(
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL,
		private readonly _addUserToPlaceGQL: AddUserToPlaceGQL
	) {}

	addUserToPlaceGQL(data: UserToPlaceInput) {
		return this._addUserToPlaceGQL.mutate({ data });
	}

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
