import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { IUser } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { USERS_ENDPOINTS } from "../../../../endpoints";
import { USER_QUERY, USERS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class UsersService {
	readonly usersQuery = this._apolloService.watchQuery<any>({
		query: USERS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly users$ = this.usersQuery.valueChanges.pipe(map(({ data }) => data.users.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchUsers() {
		await this.usersQuery.refetch();
	}

	getUser(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: USER_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.user));
	}

	createUser(user: Partial<IUser>) {
		return this._apiService.post<IUser>(USERS_ENDPOINTS.CREATE_USER, user);
	}

	updateUser(id: string, user: Partial<IUser>) {
		return this._apiService.patch<IUser>(USERS_ENDPOINTS.UPDATE_USER.replace(DYNAMIC_ID, id), user);
	}

	deleteUser(id: string) {
		return this._apiService.delete(USERS_ENDPOINTS.DELETE_USER.replace(DYNAMIC_ID, id));
	}
}
