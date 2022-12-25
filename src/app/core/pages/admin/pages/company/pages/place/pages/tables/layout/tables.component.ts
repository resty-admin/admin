import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, from, switchMap, take } from "rxjs";
import type { ITable } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { DYNAMIC_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { TablesService } from "../../../../../../../../../../shared/modules/tables";
import type { IAction } from "../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { TableDialogComponent } from "../components";

export type IResponse<T extends string> = {
	[K in T]: {
		data: ITable[];
	};
};

@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly tables$ = this._tablesService.tables$;

	readonly actions: IAction<ITable>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (table?: ITable) => this.openTableDialog(table)
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

	constructor(
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openTableDialog(table?: Partial<ITable>) {
		this._dialogService
			.open(TableDialogComponent, { data: table })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result)),
				switchMap((table: Partial<ITable>) =>
					table.id
						? this._tablesService.updateTable(table.id, table).pipe(take(1), this._toastrService.observe("Столы"))
						: this._tablesService
								.createTable({
									...table,
									hall: this._routerService.getParams(DYNAMIC_ID.slice(1))
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Столы"))
				),
				switchMap(() => from(this._tablesService.refetchTables()))
			)
			.subscribe();
	}

	openDeleteTableDialog(table: Partial<ITable>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить зал?",
					value: table
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((table) => Boolean(table)),
				switchMap((table) => this._tablesService.deleteTable(table.id))
			)
			.subscribe();
	}
}
