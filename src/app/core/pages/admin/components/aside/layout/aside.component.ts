import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest, map, skip, take } from "rxjs";

import { AsideService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { CompaniesService } from "../../../../../../features/companies";
import { PlacesService } from "../../../../../../features/places";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "../../../../../../shared/constants";
import { getI18nProvider } from "../../../../../../shared/i18n";
import { RouterService } from "../../../../../../shared/modules/router";
import { ASIDE_PAGES } from "../data";

@UntilDestroy()
@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [getI18nProvider("aside", (lang) => import(`../i18n/${lang}.json`)), getI18nProvider("form")]
})
export class AsideComponent implements OnInit {
	readonly adminRoutes = ADMIN_ROUTES;

	readonly companyActions = this._companiesService.actions;
	readonly placeActions = this._placesService.actions;

	readonly places$ = this._placesService.placesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	readonly user$ = this._authService.me$;

	readonly companyControl = new FormControl<any>();
	readonly placeControl = new FormControl<any>();

	readonly pages$ = combineLatest([this.companyControl.valueChanges, this.placeControl.valueChanges]).pipe(
		map(([company, place]: any) =>
			ASIDE_PAGES.map((asidePage) => ({
				...asidePage,
				disabled: !(company && place),
				routerLink: asidePage.routerLink.replace(PLACE_ID, place?.id).replace(COMPANY_ID, company?.id)
			}))
		)
	);

	constructor(
		private readonly _placesService: PlacesService,
		private readonly _companiesService: CompaniesService,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService,
		private readonly _asideService: AsideService
	) {}

	ngOnInit() {
		let isCompanyProgramatic = false;
		let isPlaceProgramatic = false;

		this.companyControl.valueChanges.pipe(untilDestroyed(this), skip(1)).subscribe(async (company) => {
			if (!isPlaceProgramatic) {
				// when you referesh page with active company and acitve place first time - you don't have to update place - it takes from router
				isPlaceProgramatic = true;

				this.placeControl.setValue(undefined, { emitEvent: false });
			}

			if (isCompanyProgramatic) {
				isCompanyProgramatic = false;
				return;
			}

			isCompanyProgramatic = true;
			await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, company.id));
		});

		this.placeControl.valueChanges.pipe(untilDestroyed(this), skip(1)).subscribe(async (place) => {
			if (isPlaceProgramatic) {
				isPlaceProgramatic = false;
				return;
			}

			if (!place) {
				return;
			}

			isPlaceProgramatic = true;

			// if you refresh page with active company and select place - value will be a string, not an object
			const companyId = this.companyControl.value?.id || this.companyControl.value;

			await this._routerService.navigateByUrl(
				ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, place.id)
			);
		});

		this._routerService.url$.pipe(untilDestroyed(this)).subscribe((url) => {
			if (isCompanyProgramatic) {
				isCompanyProgramatic = false;
			} else {
				const companyId = url?.split("/")[2];

				isCompanyProgramatic = true;

				this.companyControl.setValue(companyId);
			}

			if (isPlaceProgramatic) {
				isPlaceProgramatic = false;
			} else {
				const placeId = url?.split("/")[4];

				isPlaceProgramatic = true;

				this.placeControl.setValue(placeId);
			}
		});
	}

	openCreateCompanyDialog() {
		this._companiesService.openCreateCompanyDialog().pipe(take(1)).subscribe();
	}

	openCreatePlaceDialog() {
		const company = this.companyControl.value?.id;

		this._placesService.openCreatePlaceDialog({ company }).pipe(take(1)).subscribe();
	}

	async signOut() {
		await this._authService.signOut();
	}

	closeAside() {
		this._asideService.closeAside();
	}
}
