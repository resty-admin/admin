import { Injectable } from "@angular/core";
import type { AddEmployeeInput, CreateUserInput, UpdateUserInput } from "@graphql";

import { AddEmployeeToPlaceGQL, CreateUserGQL, DeleteUserGQL, UpdateUserGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class UsersService {
	constructor(
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL,
		private readonly _addEmployeeToPlaceGQL: AddEmployeeToPlaceGQL
	) {}

	addEmployeeToPlace(employeeData: AddEmployeeInput) {
		return this._addEmployeeToPlaceGQL.mutate({ employeeData });
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
