import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { HallsService } from "src/app/features/halls";
import { PLACE_ID } from "src/app/shared/constants";

import { ActionsService } from "../../../../../../../../../../features/app";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { HALLS_PAGE_I18N } from "../constants";
import { HallsPageGQL } from "../graphql/halls-page";

@UntilDestroy()
@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	readonly hallsPageI18n = HALLS_PAGE_I18N;
	private readonly _hallsPageQuery = this._hallsPageGQL.watch();
	readonly halls$: Observable<any> = this._hallsPageQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		map((halls) => halls?.map((hall) => ({ ...hall, routerLink: hall.id })))
	);

	readonly actions = this._hallsService.actions;

	constructor(
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _hallsService: HallsService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	openCreateHallDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		return this._hallsService.openCreateHallDialog({ place });
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._hallsService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._hallsPageQuery.refetch();
		});

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
