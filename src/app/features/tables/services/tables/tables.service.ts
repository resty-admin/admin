import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateTableInput, UpdateTableInput } from "../../../../../graphql";
import type { TableEntity } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateTableGQL, DeleteTableGQL, UpdateTableGQL } from "../../graphql/tables";
import { TableDialogComponent } from "../../ui/table-dialog/layout/table-dialog.component";

@Injectable({ providedIn: "root" })
export class TablesService {
	readonly actions: IAction<TableEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (table?: TableEntity) => this.openUpdateTableDialog(table).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (table?: TableEntity) => {
				if (!table) {
					return;
				}

				this.openDeleteTableDialog(table).subscribe();
			}
		}
	];

	constructor(
		private readonly _createTableGQL: CreateTableGQL,
		private readonly _updateTableGQL: UpdateTableGQL,
		private readonly _deleteTableGQL: DeleteTableGQL,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService
	) {}

	openCreateTableDialog(hall: string) {
		return this._dialogService.open(TableDialogComponent, { data: { hall } }).afterClosed$.pipe(
			take(1),
			filter((table) => Boolean(table)),
			switchMap((table: any) => this.createTable(table))
		);
	}

	openUpdateTableDialog(table?: any) {
		return this._dialogService.open(TableDialogComponent, { data: table }).afterClosed$.pipe(
			take(1),
			filter((table) => Boolean(table)),
			switchMap((table: any) => this.updateTable(table))
		);
	}

	openDeleteTableDialog(table: TableEntity) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить стол?",
				value: table
			}
		};
		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((table) => Boolean(table)),
			switchMap((table) => this.deleteTable(table.id))
		);
	}

	createTable(table: CreateTableInput) {
		return this._filesService.getFile(table.file).pipe(
			take(1),
			switchMap((file) => this._createTableGQL.mutate({ table: { ...table, file: file?.id } }))
		);
	}

	updateTable(table: UpdateTableInput) {
		return this._filesService.getFile(table.file).pipe(
			take(1),
			switchMap((file) => this._updateTableGQL.mutate({ table: { ...table, file: file?.id } }))
		);
	}

	deleteTable(tableId: string) {
		return this._deleteTableGQL.mutate({ tableId }).pipe();
	}
}
