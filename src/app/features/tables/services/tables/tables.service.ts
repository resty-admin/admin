import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { lastValueFrom, Subject, tap } from "rxjs";

import type { CreateTableInput, UpdateTableInput } from "../../../../../graphql";
import type { TableEntity } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
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
			func: (table) => this.openUpdateTableDialog(table)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (table) => this.openDeleteTableDialog(table)
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createTableGQL: CreateTableGQL,
		private readonly _updateTableGQL: UpdateTableGQL,
		private readonly _deleteTableGQL: DeleteTableGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	async openCreateTableDialog(data: AtLeast<CreateTableInput, "hall">) {
		const table: TableEntity = await lastValueFrom(
			this._dialogService.open(TableDialogComponent, { data }).afterClosed$
		);

		if (!table) {
			return;
		}

		await lastValueFrom(
			this.createTable({ name: table.name, hall: data.hall, file: table.file?.id, code: table.code })
		);
	}

	async openUpdateTableDialog(data: AtLeast<TableEntity, "id">) {
		const table: TableEntity = await lastValueFrom(
			this._dialogService.open(TableDialogComponent, { data }).afterClosed$
		);

		if (!table) {
			return;
		}

		await this.updateTable({ id: table.id, name: table.name, code: table.code, file: table.file?.id });
	}

	async openDeleteTableDialog(value: AtLeast<TableEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить стол?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this.deleteTable(value.id));
	}

	createTable(table: CreateTableInput) {
		return this._createTableGQL.mutate({ table }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateTable(table: UpdateTableInput) {
		return this._updateTableGQL.mutate({ table }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteTable(tableId: string) {
		return this._deleteTableGQL.mutate({ tableId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
