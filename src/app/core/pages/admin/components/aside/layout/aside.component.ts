import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, map } from "rxjs";
import { COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import type { ISimpleChanges } from "src/app/shared/interfaces";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { CompaniesService } from "../../../../../../features/companies";
import { PlacesService } from "../../../../../../features/places";
import { getScopeProvider } from "../../../../../../shared/i18n";
import { RouterService } from "../../../../../../shared/modules/router";
import { AuthService } from "../../../../auth/services";
import { PAGES } from "../data";
import { AsideCompaniesGQL } from "../graphql/aside-companies";
import { AsidePlacesGQL } from "../graphql/aside-places";

@UntilDestroy()
@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [getScopeProvider("aside", (lang) => import(`../i18n/${lang}.json`))]
})
export class AsideComponent implements OnChanges, OnInit {
	@Output() linkClicked = new EventEmitter();
	@Output() addPlaceClicked = new EventEmitter();
	@Output() addCompanyClicked = new EventEmitter();

	@Input() places?: any[] | null;
	@Input() companies?: any[] | null;
	@Input() activeCompanyId = "";
	@Input() activePlaceId = "";
	@Input() user?: any | null;

	readonly adminRoutes = ADMIN_ROUTES;

	readonly companiesActions = this._companiesService.actions;
	readonly placesActions = this._placesService.actions;

	pages: any[] = [];

	readonly companyControl = new FormControl<any>();
	readonly placeControl = new FormControl<any>();

	private readonly _asidePlacesQuery = this._asidePlacesGQL.watch();
	readonly places$ = this._asidePlacesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	private readonly _asideCompaniesQuery = this._asideCompaniesGQL.watch();
	readonly companies$ = this._asideCompaniesQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService,
		private readonly _asidePlacesGQL: AsidePlacesGQL,
		private readonly _asideCompaniesGQL: AsideCompaniesGQL
	) {}

	getCompanyById(id: string) {
		return this.companies?.find((company) => company.id === id);
	}

	getPlaceById(id: string) {
		return this.places?.find((place) => place.id === id);
	}

	ngOnInit() {
		this.companyControl.value$
			.pipe(
				untilDestroyed(this),
				filter((company) => Boolean(company?.id))
			)
			.subscribe(async (company) => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.PLACES.absolutePath.replace(COMPANY_ID, company.id));
				await this._asidePlacesQuery.setVariables({
					filtersArgs: [{ key: "company.id", operator: "=", value: company.id }]
				});
			});

		this.placeControl.value$
			.pipe(
				untilDestroyed(this),
				filter((place) => Boolean(place?.id))
			)
			.subscribe(async (place) => {
				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, place.id).replace(COMPANY_ID, this.activeCompanyId)
				);
			});
	}

	async ngOnChanges(changes: ISimpleChanges<AsideComponent>) {
		if (changes.activeCompanyId) {
			this.companyControl.setValue(changes.activeCompanyId.currentValue);
		}

		if (changes.activePlaceId) {
			this.placeControl.setValue(changes.activePlaceId.currentValue);
		}

		if (changes.companies && changes.companies.currentValue) {
			const isValueStillExist = changes.companies.currentValue.some((company) => company.id === this.activeCompanyId);

			if (!isValueStillExist) {
				this.companyControl.setValue(null);
				await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANIES.absolutePath);
			}
		}

		if (changes.places && changes.places.currentValue) {
			const isValueStillExist = changes.places.currentValue.some((place) => place.id === this.activePlaceId);

			if (!isValueStillExist) {
				this.placeControl.setValue(null);
				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, this.activeCompanyId)
				);
			}
		}

		this.pages = PAGES.map((page) => ({
			...page,
			routerLink: page.routerLink.replace(COMPANY_ID, this.activeCompanyId).replace(PLACE_ID, this.activePlaceId),
			disabled: !this.placeControl.value || !this.companyControl.value
		}));
	}

	emitAddCompanyClicked() {
		this.addCompanyClicked.emit();
	}

	emitAddPlaceClicked() {
		this.addPlaceClicked.emit();
	}

	emitLinkClicked() {
		this.linkClicked.emit();
	}

	async signOut() {
		await this._authService.signOut();
	}
}
