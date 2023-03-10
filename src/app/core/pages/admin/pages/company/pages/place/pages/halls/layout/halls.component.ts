import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { HallDialogComponent, HallsService } from "@features/halls";
import type { HallEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import type { IPageInfo } from "@shared/ui/pager";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { HallsPageGQL } from "../graphql";

@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	private readonly _hallsPageQuery = this._hallsPageGQL.watch();

	readonly halls$ = this._hallsPageQuery.valueChanges.pipe(map((result) => result.data.halls));

	readonly limit = 5;

	constructor(
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _hallsService: HallsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		this._actionsService.setAction({ label: "ADD_HALL", func: () => this.openCreateHallDialog() });

		await this._hallsPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) }],
			skip: 0,
			take: this.limit
		});
	}

	async updateQuery(page: IPageInfo) {
		await this._hallsPageQuery.setVariables({
			...this._hallsPageQuery.variables,
			skip: page.pageSize * page.offset
		});
	}

	openCreateHallDialog() {
		this._dialogService
			.open(HallDialogComponent)
			.afterClosed$.pipe(
				filter((hall) => Boolean(hall)),
				switchMap((hall) =>
					this._hallsService
						.createHall({
							name: hall.name,
							place: this._routerService.getParams(PLACE_ID.slice(1)),
							file: hall.file?.id
						})
						.pipe(
							switchMap(() => this._hallsPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("HALLS.CREATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateHallDialog(data: AtLeast<HallEntity, "id">) {
		this._dialogService
			.open(HallDialogComponent, { data })
			.afterClosed$.pipe(
				filter((hall) => Boolean(hall)),
				switchMap((hall) =>
					this._hallsService.updateHall({ id: hall.id, name: hall.name, file: hall.file?.id }).pipe(
						switchMap(() => from(this._hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("HALLS.UPDATE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteHallDialog(value: AtLeast<HallEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("HALLS.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._hallsService.deleteHall(value.id).pipe(
						switchMap(() => this._hallsPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("HALLS.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
