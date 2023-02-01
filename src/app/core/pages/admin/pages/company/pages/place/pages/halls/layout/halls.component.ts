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

	readonly halls$ = this._hallsPageQuery.valueChanges.pipe(map((result) => result.data.halls.data));

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
		this._actionsService.setAction({ label: "Добавить зал", func: () => this.openCreateHallDialog() });

		await this._hallsPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) }]
		});
	}

	openCreateHallDialog() {
		return this._dialogService.open(HallDialogComponent).afterClosed$.pipe(
			filter((hall) => Boolean(hall)),
			switchMap((hall) =>
				this._hallsService
					.createHall({ name: hall.name, place: this._routerService.getParams(PLACE_ID.slice(1)), file: hall.file?.id })
					.pipe(
						switchMap(() => from(this._hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("CREATE_HALL"))
					)
			),
			take(1)
		);
	}

	openUpdateHallDialog(data: AtLeast<HallEntity, "id">) {
		this._dialogService
			.open(HallDialogComponent, { data })
			.afterClosed$.pipe(
				filter((hall) => Boolean(hall)),
				switchMap((hall) =>
					this._hallsService.updateHall({ id: hall.id, name: hall.name, file: hall.file?.id }).pipe(
						switchMap(() => from(this._hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("UPDATE_HALL"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteHallDialog(value: AtLeast<HallEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._hallsService.deleteHall(value.id).pipe(
						switchMap(() => from(this._hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("DELETE_HALL"))
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
