import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, shareReplay, take } from "rxjs";

import { AsideService } from "../../../../features/app";
import { AuthService } from "../../../../features/auth/services";
import { CompaniesService } from "../../../../features/companies";
import { PlacesService } from "../../../../features/places";
import { ADMIN_ROUTES, COMPANY_ID } from "../../../../shared/constants";
import { RouterService } from "../../../../shared/modules/router";
import type { IAction } from "../../../../shared/ui/actions";

@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
	readonly profileActions: IAction<any>[] = [
		{
			label: "Профиль",
			icon: "profile",
			func: async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.PROFILE.absolutePath);
			}
		},
		{
			label: "Выйти",
			icon: "exit",
			func: async () => {
				await this._authService.signOut();
			}
		}
	];

	readonly companyActions = this._companiesService.actions;
	readonly placeActions = this._placesService.actions;

	readonly isAsideOpen$ = this._asideService.isOpen$.pipe(shareReplay({ refCount: true }));

	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	readonly places$ = this._placesService.placesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	constructor(
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService
	) {}

	toggleAside() {
		this._asideService.toggleAside();
	}

	openCreateCompanyDialog() {
		this._companiesService.openCreateCompanyDialog().pipe(take(1)).subscribe();
	}

	openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		this._placesService.openCreatePlaceDialog({ company }).pipe(take(1)).subscribe();
	}

	async signOut() {
		await this._authService.signOut();
	}
}
