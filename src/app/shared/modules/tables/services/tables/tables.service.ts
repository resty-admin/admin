import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { ITable } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { TABLES_ENDPOINTS } from "../../../../endpoints";
import { TABLE_QUERY, TABLES_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesService {
	readonly tablesQuery = this._apolloService.watchQuery<any>({
		query: TABLES_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly tables$ = this.tablesQuery.valueChanges.pipe(map(({ data }) => data.tables.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchTables() {
		await this.tablesQuery.refetch();
	}

	getTable(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: TABLE_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.table));
	}

	createTable(table: Partial<ITable>) {
		return this._apiService.post<ITable>(TABLES_ENDPOINTS.CREATE_TABLE, table);
	}

	updateTable(id: string, table: Partial<ITable>) {
		return this._apiService.patch<ITable>(TABLES_ENDPOINTS.UPDATE_TABLE.replace(DYNAMIC_ID, id), table);
	}

	deleteTable(id: string) {
		return this._apiService.delete(TABLES_ENDPOINTS.DELETE_TABLE.replace(DYNAMIC_ID, id));
	}
}
