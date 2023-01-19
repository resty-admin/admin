import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";
import { TableDialogComponent, TableQrCodeDialogComponent, TablesService } from "src/app/features/tables";
import { RouterService } from "src/app/shared/modules/router";

import type { TableEntity } from "../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../features/app";
import { ADMIN_ROUTES, COMPANY_ID, HALL_ID, PLACE_ID } from "../../../../../../../../../../shared/constants";
import type { AtLeast } from "../../../../../../../../../../shared/interfaces";
import { BreadcrumbsService } from "../../../../../../../../../../shared/modules/breadcrumbs";
import type { IAction } from "../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../shared/ui/toastr";
import { TABLES_PAGE_I18N } from "../constants";
import { TablesPageGQL } from "../graphql/tables-page";

@UntilDestroy()
@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	readonly tablesPageI18n = TABLES_PAGE_I18N;
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();
	readonly tables$ = this._tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));
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

	constructor(
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _toastrService: ToastrService
	) {}

	async ngOnInit() {
		const { companyId, placeId, hallId } = this._routerService.getParams();

		if (!companyId || !placeId || !hallId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.HALLS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		});

		this._actionsService.setAction({ label: "Добавить стол", func: () => this.openCreateTableDialog() });

		await this._tablesPageQuery.setVariables({ filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }] });
	}

	async openTableQrCodeDialog(data: TableEntity) {
		await lastValueFrom(this._dialogService.open(TableQrCodeDialogComponent, { data }).afterClosed$);
	}

	async openCreateTableDialog() {
		const hall = this._routerService.getParams(HALL_ID.slice(1));

		if (!hall) {
			return;
		}

		const table: TableEntity | undefined = await lastValueFrom(
			this._dialogService.open(TableDialogComponent).afterClosed$
		);

		if (!table) {
			return;
		}

		await lastValueFrom(
			this._tablesService
				.createTable({ name: table.name, hall, file: table.file?.id, code: table.code })
				.pipe(this._toastrService.observe("Столы"))
		);

		await this._tablesPageQuery.refetch();
	}

	async openUpdateTableDialog(data: AtLeast<TableEntity, "id">) {
		const table: TableEntity | undefined = await lastValueFrom(
			this._dialogService.open(TableDialogComponent, { data }).afterClosed$
		);

		if (!table) {
			return;
		}

		await lastValueFrom(
			this._tablesService
				.updateTable({ id: table.id, name: table.name, code: table.code, file: table.file?.id })
				.pipe(this._toastrService.observe("Столы"))
		);

		await this._tablesPageQuery.refetch();
	}

	async openDeleteTableDialog(value: AtLeast<TableEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить стол?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._tablesService.deleteTable(value.id).pipe(this._toastrService.observe("Столы")));

		await this._tablesPageQuery.refetch();
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
