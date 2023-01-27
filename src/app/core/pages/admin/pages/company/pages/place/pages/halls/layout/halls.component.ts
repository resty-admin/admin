import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { HallDialogComponent, HallsService } from "@features/halls";
import type { HallEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { HALLS_PAGE } from "../constants";
import { HallsPageGQL } from "../graphql";

@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	readonly hallsPage = HALLS_PAGE;
	private readonly _hallsPageQuery = this._hallsPageGQL.watch();
	readonly halls$ = this._hallsPageQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		map((halls) => halls?.map((hall) => ({ ...hall, routerLink: hall.id })))
	);

	readonly actions: IAction<HallEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (hall) => this.openUpdateHallDialog(hall)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (hall) => this.openDeleteHallDialog(hall)
		}
	];

	constructor(
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _hallsService: HallsService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async openCreateHallDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		const hall: HallEntity | undefined = await lastValueFrom(
			this._dialogService.open(HallDialogComponent).afterClosed$
		);

		if (!hall) {
			return;
		}

		await lastValueFrom(
			this._hallsService
				.createHall({ name: hall.name, place, file: hall.file?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.hallsPage),
						this._i18nService.translate("created", {}, this.hallsPage)
					)
				)
		);

		await this._hallsPageQuery.refetch();
	}

	async openUpdateHallDialog(data: AtLeast<HallEntity, "id">) {
		const hall: HallEntity | undefined = await lastValueFrom(
			this._dialogService.open(HallDialogComponent, { data }).afterClosed$
		);

		if (!hall) {
			return;
		}

		await lastValueFrom(
			this._hallsService
				.updateHall({ id: hall.id, name: hall.name, file: hall.file?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.hallsPage),
						this._i18nService.translate("updated", {}, this.hallsPage)
					)
				)
		);

		await this._hallsPageQuery.refetch();
	}

	async openDeleteHallDialog(value: AtLeast<HallEntity, "id">) {
		const config = { data: { title: this._i18nService.translate("confirm", {}, this.hallsPage), value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._hallsService
				.deleteHall(value.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.hallsPage),
						this._i18nService.translate("deleted", {}, this.hallsPage)
					)
				)
		);

		await this._hallsPageQuery.refetch();
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить зал",
			func: () => this.openCreateHallDialog()
		});

		await this._hallsPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
