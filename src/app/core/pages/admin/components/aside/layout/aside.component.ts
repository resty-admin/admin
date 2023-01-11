import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import type { ISimpleChanges } from "src/app/shared/interfaces";

import { getI18nProvider } from "../../../../../../shared/i18n";
import { RouterService } from "../../../../../../shared/modules/router";
import { PAGES } from "../data";

@UntilDestroy()
@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [getI18nProvider("aside", (lang) => import(`../i18n/${lang}.json`)), getI18nProvider("form")]
})
export class AsideComponent implements OnChanges, OnInit {
	@Output() linkClicked = new EventEmitter();
	@Output() createPlaceClicked = new EventEmitter();
	@Output() createCompanyClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();

	@Input() places?: any[] | null;
	@Input() companies?: any[] | null;
	@Input() placeActions?: any;
	@Input() companyActions?: any;
	@Input() activeCompanyId = "";
	@Input() activePlaceId = "";
	@Input() user?: any | null;

	readonly adminRoutes = ADMIN_ROUTES;

	pages: any[] = [];

	readonly companyControl = new FormControl<any>();
	readonly placeControl = new FormControl<any>();

	constructor(private readonly _routerService: RouterService) {}

	getCompanyById(id: string) {
		return this.companies?.find((company) => company.id === id);
	}

	getPlaceById(id: string) {
		return this.places?.find((place) => place.id === id);
	}

	ngOnInit() {
		console.log("check");
		// this.companyControl.value$
		// 	.pipe(
		// 		untilDestroyed(this),
		// 		filter((company) => Boolean(company?.id))
		// 	)
		// 	.subscribe(async (company) => {
		// 		await this._routerService.navigateByUrl(ADMIN_ROUTES.PLACES.absolutePath.replace(COMPANY_ID, company.id));
		// 		await this._asidePlacesQuery.setVariables({
		// 			filtersArgs: [{ key: "company.id", operator: "=", value: company.id }]
		// 		});
		// 	});
		//
		// this.placeControl.value$
		// 	.pipe(
		// 		untilDestroyed(this),
		// 		filter((place) => Boolean(place?.id))
		// 	)
		// 	.subscribe(async (place) => {
		// 		await this._routerService.navigateByUrl(
		// 			ADMIN_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, place.id).replace(COMPANY_ID, this.activeCompanyId)
		// 		);
		// 	});
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

	emitCreateCompanyClick() {
		this.createCompanyClicked.emit();
	}

	emitCreatePlaceClick() {
		this.createPlaceClicked.emit();
	}

	emitLinkClick() {
		this.linkClicked.emit();
	}

	emitSignOutClick() {
		this.signOutClicked.emit();
	}
}
