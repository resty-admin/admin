import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, map, shareReplay, take } from "rxjs";

import { AuthService } from "../../../../features/auth/services";
import { CompaniesService } from "../../../../features/companies";
import { PlacesService } from "../../../../features/places";
import { RouterService } from "../../../../shared/modules/router";

@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
	readonly places$ = this._placesService.placesQuery.valueChanges.pipe(map((result) => result.data.places.data));
	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	readonly user$ = this._authService.me$;
	readonly activeCompanyId$ = this._routerService.url$.pipe(map((url) => url?.split("/")[2]));
	readonly activePlaceId$ = this._routerService.url$.pipe(map((url) => url?.split("/")[4]));
	readonly isAsideOpenSubject = new BehaviorSubject(false);
	readonly isAsideOpen$ = this.isAsideOpenSubject.asObservable().pipe(shareReplay({ refCount: true }));

	readonly companyActions = this._companiesService.actions;
	readonly placeActions = this._placesService.actions;
	constructor(
		private readonly _authService: AuthService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService,
		private readonly _routerService: RouterService
	) {}

	openCreateCompanyDialog() {
		this._companiesService.openCreateCompanyDialog().pipe(take(1)).subscribe();
	}

	openCreatePlaceDialog() {
		this._placesService.openCreatePlaceDialog().pipe(take(1)).subscribe();
	}

	toggleAside() {
		this.isAsideOpenSubject.next(!this.isAsideOpenSubject.value);
	}
}
