import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import type { PlaceEntity } from "../../../../../../../../../graphql";
import { PlacesService } from "../../../../../../../../features/places";
import { PlaceDialogComponent } from "../../../../../../../../features/places/ui/place-dialog/layout/place-dialog.component";
import { DialogService } from "../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../shared/ui/toastr";
import { PLACES_PAGE_I18N } from "../constants";
import { PlacesPageGQL } from "../graphql/places-page";

@UntilDestroy()
@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly placesPageI18n = PLACES_PAGE_I18N;
	private readonly _placesPageQuery = this._placesPageGQL.watch();
	readonly places$ = this._placesPageQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		private readonly _placesPageGQL: PlacesPageGQL,
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		this._placesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._placesPageQuery.refetch();
		});

		const companyId = this._routerService.getParams(COMPANY_ID.slice(1));

		await this._placesPageQuery.setVariables({
			filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
		});
	}

	async openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!company) {
			return;
		}

		const place: PlaceEntity | undefined = await lastValueFrom(
			this._dialogService.open(PlaceDialogComponent).afterClosed$
		);

		if (!place) {
			return;
		}

		const result = await lastValueFrom(
			this._placesService
				.createPlace({ name: place.name, company, file: place.file?.id })
				.pipe(this._toastrService.observe("Заведения"))
		);

		if (!result.data?.createPlace) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, result.data.createPlace.id)
		);
	}
}
