import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { ACCOUNTING_SYSTEMS_ENDPOINTS } from "src/app/shared/endpoints";
import type { IAccountingSystem } from "src/app/shared/interfaces";

import { ApiService } from "../../../api";
import { ApolloService } from "../../../apollo";
import { ACCOUNTING_SYSTEM_QUERY, ACCOUNTING_SYSTEMS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	readonly accountingSystemsQuery = this._apolloService.watchQuery<any>({
		query: ACCOUNTING_SYSTEMS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly accountingSystems$ = this.accountingSystemsQuery.valueChanges.pipe(
		map(({ data }) => data.accountingSystems.data)
	);

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchAccountingSystems() {
		await this.accountingSystemsQuery.refetch();
	}

	getAccountingSystem(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: ACCOUNTING_SYSTEM_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.accountingSystem));
	}

	createAccountingSystem(accountingSystem: Partial<IAccountingSystem>) {
		return this._apiService.post<IAccountingSystem>(
			ACCOUNTING_SYSTEMS_ENDPOINTS.CREATE_ACCOUNTING_SYSTEM,
			accountingSystem
		);
	}

	updateAccountingSystem(id: string, accountingSystem: Partial<IAccountingSystem>) {
		return this._apiService.patch<IAccountingSystem>(
			ACCOUNTING_SYSTEMS_ENDPOINTS.UPDATE_ACCOUNTING_SYSTEM.replace(DYNAMIC_ID, id),
			accountingSystem
		);
	}

	deleteAccountingSystem(id: string) {
		return this._apiService.delete(ACCOUNTING_SYSTEMS_ENDPOINTS.DELETE_ACCOUNTING_SYSTEM.replace(DYNAMIC_ID, id));
	}
}
