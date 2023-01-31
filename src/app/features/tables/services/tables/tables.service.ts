import { Injectable } from "@angular/core";
import type { CreateTableInput, UpdateTableInput } from "@graphql";

import { CreateTableGQL, DeleteTableGQL, UpdateTableGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesService {
	constructor(
		private readonly _createTableGQL: CreateTableGQL,
		private readonly _updateTableGQL: UpdateTableGQL,
		private readonly _deleteTableGQL: DeleteTableGQL
	) {}

	createTable(table: CreateTableInput) {
		return this._createTableGQL.mutate({ table });
	}

	updateTable(table: UpdateTableInput) {
		return this._updateTableGQL.mutate({ table });
	}

	deleteTable(tableId: string) {
		return this._deleteTableGQL.mutate({ tableId });
	}
}
