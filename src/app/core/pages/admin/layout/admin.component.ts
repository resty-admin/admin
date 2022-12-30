import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject, map, shareReplay } from "rxjs";
import { COMPANY_ID } from "src/app/shared/constants";

import { CompaniesService } from "../../../../features/companies";
import { PlacesService } from "../../../../features/places";
import { RouterService } from "../../../../shared/modules/router";
import { AuthService } from "../../auth/services";

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
	readonly places$ = this._placesService.places$;
	readonly companies$ = this._companiesService.companies$;
	readonly user$ = this._authService.me$;
	readonly activeCompanyId$ = this._routerService.url$.pipe(map((url) => url?.split("/")[2]));
	readonly activePlaceId$ = this._routerService.url$.pipe(map((url) => url?.split("/")[4]));
	readonly isAsideOpenSubject = new BehaviorSubject(false);
	readonly isAsideOpen$ = this.isAsideOpenSubject.asObservable().pipe(shareReplay({ refCount: true }));

	constructor(
		private readonly _authService: AuthService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService,
		private readonly _routerService: RouterService
	) {}

	toggleAside() {
		this.isAsideOpenSubject.next(!this.isAsideOpenSubject.value);
	}

	openAddCompanyDialog() {
		this._companiesService.openCreateOrUpdateCompanyDialog().subscribe();
	}

	openAddPlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		this._placesService.openCreateOrUpdatePlaceDialog({ company }).subscribe();
	}
}
