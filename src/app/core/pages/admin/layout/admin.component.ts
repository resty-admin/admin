import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";

import { AsideService } from "../../../../features/app";
import { AuthService } from "../../../../features/auth/services";
import { CompaniesService } from "../../../../features/companies";
import { PlacesService } from "../../../../features/places";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "../../../../shared/constants";
import { RouterService } from "../../../../shared/modules/router";
import type { IAction } from "../../../../shared/ui/actions";

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
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

	readonly placeActions = this._placesService.actions;
	readonly companyActions = this._companiesService.actions;

	readonly isAsideOpen$ = this._asideService.isOpen$;

	readonly user$ = this._authService.me$;

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

	ngOnInit() {
		this._placesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._companiesService.companiesQuery.refetch();
		});

		this._companiesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._companiesService.companiesQuery.refetch();
		});
	}

	toggleAside() {
		this._asideService.toggleAside();
	}

	openCreateCompanyDialog() {
		this._companiesService
			.openCreateCompanyDialog()
			.pipe(
				take(1),
				map((result) => result.data?.createCompany)
			)
			.subscribe(async (company) => {
				if (!company) {
					return;
				}

				await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, company.id));
			});
	}

	openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!company) {
			return;
		}

		this._placesService
			.openCreatePlaceDialog({ company })
			.pipe(
				take(1),
				map((result) => result.data?.createPlace)
			)
			.subscribe(async (place) => {
				if (!place) {
					return;
				}

				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, place.id)
				);
			});
	}

	async signOut() {
		await this._authService.signOut();
	}
}
