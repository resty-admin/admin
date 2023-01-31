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
import { filter, from, switchMap, take } from "rxjs";

import { HALLS_PAGE } from "../constants";
import { HallsPageService } from "../services";

@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	readonly hallsPage = HALLS_PAGE;

	readonly halls$ = this._hallsPageService.halls$;

	constructor(
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _hallsPageService: HallsPageService,
		private readonly _hallsService: HallsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._actionsService.setAction({ label: "Добавить зал", func: () => this.openCreateHallDialog() });
	}

	openCreateHallDialog() {
		return this._dialogService.open(HallDialogComponent).afterClosed$.pipe(
			filter((hall) => Boolean(hall)),
			switchMap((hall) =>
				this._hallsService
					.createHall({ name: hall.name, place: this._routerService.getParams(PLACE_ID.slice(1)), file: hall.file?.id })
					.pipe(
						switchMap(() => from(this._hallsPageService.hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("createHall"))
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
						switchMap(() => from(this._hallsPageService.hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("updateHall"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteHallDialog(value: AtLeast<HallEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("confirm"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._hallsService.deleteHall(value.id).pipe(
						switchMap(() => from(this._hallsPageService.hallsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("deleteHall"))
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
