import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { filter, from, shareReplay, switchMap, take } from "rxjs";

import { COMPANY_ID } from "../../../../shared/constants";
import type { ICompany } from "../../../../shared/interfaces";
import type { IPlace } from "../../../../shared/interfaces";
import { CompaniesService } from "../../../../shared/modules/companies";
import { PlacesService } from "../../../../shared/modules/places";
import { RouterService } from "../../../../shared/modules/router";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { AuthService } from "../../auth/services";
import { CompanyDialogComponent } from "../pages/companies/components";
import { PlaceDialogComponent } from "../pages/company/pages/places/components";
import { AsideService } from "../services/aside/aside.service";

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
	readonly places$ = this._asideService.places$;
	readonly companies$ = this._asideService.companies$;
	readonly activePlaceId$ = this._asideService.activePlaceId$;
	readonly activeCompanyId$ = this._asideService.activeCompanyId$;
	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	isAsideOpen = false;

	constructor(
		private readonly _asideService: AsideService,
		private readonly _authService: AuthService,
		private readonly _dialogService: DialogService,
		private readonly _placesService: PlacesService,
		private readonly _companiesService: CompaniesService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService
	) {}

	toggleAside() {
		this.isAsideOpen = !this.isAsideOpen;
	}

	openAddCompanyDialog() {
		this._dialogService
			.open(CompanyDialogComponent)
			.afterClosed$.pipe(
				take(1),
				filter((company) => Boolean(company)),
				switchMap((company: Partial<ICompany>) =>
					this._companiesService.createCompany(company).pipe(take(1), this._toastrService.observe("Компании"))
				),
				switchMap(() => from(this._companiesService.refetchCompanies()))
			)
			.subscribe();
	}

	openAddPlaceDialog() {
		this._dialogService
			.open(PlaceDialogComponent)
			.afterClosed$.pipe(
				take(1),
				filter((place) => Boolean(place)),
				switchMap((place: IPlace) =>
					this._placesService
						.createPlace({
							...place,
							company: this._routerService.getParams(COMPANY_ID.slice(1))
						} as unknown as any)
						.pipe(take(1), this._toastrService.observe("Заведение"))
				)
			)
			.subscribe(async () => {
				await this._placesService.refetchPlaces();
			});
	}
}
