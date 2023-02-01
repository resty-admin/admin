import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { TableDialogComponent, TableQrCodeDialogComponent, TablesService } from "@features/tables";
import type { TableEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, HALL_ID, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { TablesPageGQL } from "../graphql";

@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();

	readonly tables$ = this._tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));

	constructor(
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		await this._tablesPageQuery.setVariables({
			filtersArgs: [{ key: "hall.id", operator: "=", value: this._routerService.getParams(HALL_ID.slice(1)) }]
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.HALLS.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
		});

		this._actionsService.setAction({ label: "Добавить стол", func: () => this.openCreateTableDialog() });
	}

	openCreateTableDialog() {
		return this._dialogService
			.open(TableDialogComponent)
			.afterClosed$.pipe(
				filter((table) => Boolean(table)),
				switchMap((table) =>
					this._tablesService
						.createTable({
							name: table.name,
							hall: this._routerService.getParams(HALL_ID.slice(1)),
							file: table.file?.id,
							code: table.code
						})
						.pipe(
							switchMap(() => from(this._tablesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("TABLES.CREATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateTableDialog(data: AtLeast<TableEntity, "id">) {
		this._dialogService
			.open(TableDialogComponent, { data })
			.afterClosed$.pipe(
				filter((table) => Boolean(table)),
				switchMap((table) =>
					this._tablesService
						.updateTable({ id: table.id, name: table.name, code: table.code, file: table.file?.id })
						.pipe(
							switchMap(() => from(this._tablesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("TABLES.UPDATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteTableDialog(value: AtLeast<TableEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("TABLES.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._tablesService.deleteTable(value.id).pipe(
						switchMap(() => from(this._tablesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("TABLES.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openTableQrCodeDialog(data: TableEntity) {
		this._dialogService.open(TableQrCodeDialogComponent, { data }).afterClosed$.pipe(take(1)).subscribe();
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
