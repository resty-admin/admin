import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NavigationEnd, Router, Scroll } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
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

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
	readonly places$ = this._placesService.places$;
	readonly companies$ = this._companiesService.companies$;

	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	isAsideOpen = false;
	activePlaceId = "";
	activeCompanyId = "";

	constructor(
		private readonly _authService: AuthService,
		private readonly _dialogService: DialogService,
		private readonly _placesService: PlacesService,
		private readonly _companiesService: CompaniesService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {}

	updateNav(companyId: string, placeId: string) {
		this.activeCompanyId = companyId;
		this.activePlaceId = placeId;
	}

	ngOnInit() {
		this._router.events.pipe(untilDestroyed(this)).subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const [_, __, companyId, ___, placeId] = event.url.split("/");
				this.updateNav(companyId, placeId);
			}

			if (event instanceof Scroll && event.routerEvent instanceof NavigationEnd) {
				const [_, __, companyId, ___, placeId] = event.routerEvent.url.split("/");
				this.updateNav(companyId, placeId);
			}
		});
	}

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
