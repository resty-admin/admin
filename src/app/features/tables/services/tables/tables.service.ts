import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateTableInput, TableEntity, UpdateTableInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { TableDialogComponent } from "../../components";
import { CreateTableGQL, DeleteTableGQL, TablesGQL, UpdateTableGQL } from "../../graphql/tables";

@Injectable({ providedIn: "root" })
export class TablesService {
	private readonly _tablesQuery = this._tablesGQL.watch({ skip: 0, take: 10 });

	readonly tables$ = this._tablesQuery.valueChanges.pipe(map((result) => result.data.tables.data));

	readonly actions: IAction<TableEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (table?: TableEntity) => this.openCreateOrUpdateTableDialog(table).subscribe()
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
		private readonly _tablesGQL: TablesGQL,
		private readonly _createTableGQL: CreateTableGQL,
		private readonly _updateTableGQL: UpdateTableGQL,
		private readonly _deleteTableGQL: DeleteTableGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	openCreateOrUpdateTableDialog(data?: any) {
		return this._dialogService.openFormDialog(TableDialogComponent, { data }).pipe(
			switchMap((table: any) =>
				table.id
					? this.updateTable({
							id: table.id,
							name: table.name,
							file: table.file,
							code: Number.parseInt(table.code)
					  })
					: this.createTable({ ...table, code: Number.parseInt(table.code) })
			)
		);
	}

	openDeleteTableDialog(table: TableEntity) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить стол?",
					value: table
				}
			})
			.pipe(switchMap((table) => this.deleteTable(table.id)));
	}

	createTable(table: CreateTableInput) {
		return this._filesService.getFile(table.file).pipe(
			switchMap((file) => this._createTableGQL.mutate({ table: { ...table, file: file?.id } })),
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this._tablesQuery.refetch();
			})
		);
	}

	updateTable(table: UpdateTableInput) {
		return this._filesService.getFile(table.file).pipe(
			switchMap((file) => this._updateTableGQL.mutate({ table: { ...table, file: file?.id } })),
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this._tablesQuery.refetch();
			})
		);
	}

	deleteTable(tableId: string) {
		return this._deleteTableGQL.mutate({ tableId }).pipe(
			take(1),
			this._toastrService.observe("Залы"),
			tap(async () => {
				await this._tablesQuery.refetch();
			})
		);
	}
}
