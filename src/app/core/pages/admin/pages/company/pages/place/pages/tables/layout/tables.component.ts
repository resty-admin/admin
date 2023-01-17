import type { AfterViewInit, OnDestroy } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map, take } from "rxjs";
import { TableQrCodeDialogComponent, TablesService } from "src/app/features/tables";
import { RouterService } from "src/app/shared/modules/router";

import type { TableEntity } from "../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../features/app";
import { ADMIN_ROUTES, COMPANY_ID, HALL_ID, PLACE_ID } from "../../../../../../../../../../shared/constants";
import { BreadcrumbsService } from "../../../../../../../../../../shared/modules/breadcrumbs";
import { DialogService } from "../../../../../../../../../../shared/ui/dialog";
import { TABLES_PAGE_I18N } from "../constants";
import { TablesPageGQL } from "../graphql/tables-page";

@UntilDestroy()
@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements AfterViewInit, OnDestroy {
	readonly tablesPageI18n = TABLES_PAGE_I18N;
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();
	readonly tables$: Observable<any> = this._tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));
	readonly actions = this._tablesService.actions;

	constructor(
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	async ngAfterViewInit() {
		const { companyId, placeId, hallId } = this._routerService.getParams();

		if (!companyId || !placeId || !hallId) {
			return;
		}

		this._tablesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._tablesPageQuery.refetch();
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.HALLS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		});

		this._actionsService.setAction({ label: "Добавить стол", func: () => this.openCreateTableDialog() });

		await this._tablesPageQuery.setVariables({ filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }] });
	}

	openTableQrCodeDialog(data: TableEntity) {
		return this._dialogService
			.open(TableQrCodeDialogComponent, { data })
			.afterClosed$.pipe(take(1))
			.subscribe(() => {});
	}

	openCreateTableDialog() {
		const hall = this._routerService.getParams(HALL_ID.slice(1));

		if (!hall) {
			return;
		}

		return this._tablesService.openCreateTableDialog({ hall }).pipe(take(1)).subscribe();
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
