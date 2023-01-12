import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";

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
			func: (table) => this.openUpdateTableDialog(table).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (table) => this.openDeleteTableDialog(table).pipe(take(1)).subscribe()
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

	openCreateTableDialog(data: AtLeast<CreateTableInput, "hall">) {
		return this._dialogService.open(TableDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((table) => Boolean(table)),
			switchMap((table: TableEntity) =>
				this.createTable({ name: table.name, hall: data.hall, file: table.file?.id, code: table.code })
			)
		);
	}

	openUpdateTableDialog(data: AtLeast<TableEntity, "id">) {
		return this._dialogService.open(TableDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((table) => Boolean(table)),
			switchMap((table: TableEntity) =>
				this.updateTable({ id: table.id, name: table.name, code: table.code, file: table.file?.id })
			)
		);
	}

	openDeleteTableDialog(value: AtLeast<TableEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить стол?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((table) => Boolean(table)),
			switchMap((table) => this.deleteTable(table.id))
		);
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
