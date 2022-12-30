import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { ITable } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateTableInput, UpdateTableInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { TableDialogComponent } from "../../components";
import { CreateTableGQL, DeleteTableGQL, TablesGQL, UpdateTableGQL } from "../../graphql/tables";

@Injectable({ providedIn: "root" })
export class TablesService {
	readonly actions: IAction<ITable>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (table?: ITable) => this.openCreateOrUpdateTableDialog(table)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (table?: ITable) => {
				if (!table) {
					return;
				}

				this.openDeleteTableDialog(table);
			}
		}
	];

	readonly tables$ = this._tablesGQL.watch().valueChanges.pipe(map((result) => result.data.tables.data));

	constructor(
		private readonly _tablesGQL: TablesGQL,
		private readonly _createTableGQL: CreateTableGQL,
		private readonly _updateTableGQL: UpdateTableGQL,
		private readonly _deleteTableGQL: DeleteTableGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._tablesGQL.watch().refetch();
	}

	openCreateOrUpdateTableDialog(table?: any) {
		return this._dialogService
			.openFormDialog(TableDialogComponent, { data: { table } })
			.pipe(switchMap((table: any) => (table.id ? this.updateTable(table) : this.createTable(table))));
	}

	openDeleteTableDialog(table: ITable) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить стол?",
					value: table
				}
			})
			.pipe(switchMap((table) => this._deleteTableGQL.mutate(table.id)));
	}

	createTable(table: CreateTableInput) {
		return this._createTableGQL.mutate({ table }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateTable(table: UpdateTableInput) {
		return this._updateTableGQL.mutate({ table }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteTable(tableId: string) {
		return this._deleteTableGQL.mutate({ tableId }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
