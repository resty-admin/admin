import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs";
import { COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import type { AtLeast, ICompany, IPlace, ISimpleChanges, IUser } from "src/app/shared/interfaces";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { CompaniesService } from "../../../../../features/companies";
import { PlacesService } from "../../../../../features/places";
import { RouterService } from "../../../../../shared/modules/router";
import { AuthService } from "../../../auth/services";
import { PAGES } from "../../data";

@UntilDestroy()
@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent implements OnChanges, OnInit {
	@Output() linkClicked = new EventEmitter();
	@Output() addPlaceClicked = new EventEmitter();
	@Output() addCompanyClicked = new EventEmitter();
	readonly adminRoutes = ADMIN_ROUTES;

	@Input() places?: IPlace[] | null;
	@Input() companies?: ICompany[] | null;

	@Input() activeCompanyId = "";
	@Input() activePlaceId = "";
	@Input() user?: IUser | null;

	readonly companiesActions = this._companiesService.actions;
	readonly placesActions = this._placesService.actions;

	pages: any[] = [];

	readonly companyControl = new FormControl<AtLeast<ICompany, "id">>();
	readonly placeControl = new FormControl<AtLeast<IPlace, "id">>();

	constructor(
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService
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
			});

		this.placeControl.value$
			.pipe(
				untilDestroyed(this),
				filter((place) => Boolean(place?.id))
			)
			.subscribe(async (place) => {
				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.DASHBOARD.absolutePath
						.replace(COMPANY_ID, this.companyControl.value as any)
						.replace(PLACE_ID, place.id)
				);
			});
	}

	ngOnChanges(changes: ISimpleChanges<AsideComponent>) {
		if (changes.activeCompanyId) {
			this.companyControl.setValue(changes.activeCompanyId.currentValue as any);
		}

		if (changes.activePlaceId) {
			this.placeControl.setValue(changes.activePlaceId.currentValue as any);
		}

		this.pages = PAGES.map((page) => ({
			...page,
			routerLink: page.routerLink.replace(COMPANY_ID, this.activeCompanyId).replace(PLACE_ID, this.activePlaceId),
			disabled: !this.placeControl.value || !this.companyControl.value
		}));
	}

	async signOut() {
		await this._authService.signOut();
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
}
