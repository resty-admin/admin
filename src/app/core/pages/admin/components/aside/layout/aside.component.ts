import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest, map, skip } from "rxjs";

import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "../../../../../../shared/constants";
import { getI18nProvider } from "../../../../../../shared/i18n";
import { RouterService } from "../../../../../../shared/modules/router";
import { FORM_I18N } from "../../../../../constants";
import { ASIDE_I18N } from "../constants";
import { ASIDE_PAGES } from "../data";

@UntilDestroy()
@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [getI18nProvider(ASIDE_I18N, (lang) => import(`../i18n/${lang}.json`)), getI18nProvider("form")]
})
export class AsideComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Output() addCompanyClicked = new EventEmitter();
	@Output() addPlaceClicked = new EventEmitter();
	@Input() user: any;
	@Input() isAsideOpen: any;
	@Input() companyActions: any;
	@Input() placeActions: any;
	@Input() companies: any;
	@Input() places: any;

	readonly asideI18n = ASIDE_I18N;

	readonly adminRoutes = ADMIN_ROUTES;

	readonly companyControl = new FormControl<any>();
	readonly placeControl = new FormControl<any>();

	readonly pages$ = combineLatest([this.companyControl.valueChanges, this.placeControl.valueChanges]).pipe(
		map(([company, place]: any) =>
			ASIDE_PAGES.map((asidePage) => ({
				...asidePage,
				disabled: !(company && place),
				routerLink: asidePage.routerLink
					.replace(PLACE_ID, place?.id || place)
					.replace(COMPANY_ID, company?.id || company)
			}))
		)
	);

	constructor(private readonly _routerService: RouterService) {}

	ngOnInit() {
		let isCompanyProgramatic = false;
		let isPlaceProgramatic = false;

		this.companyControl.valueChanges.pipe(untilDestroyed(this), skip(1)).subscribe(async (company) => {
			if (!isPlaceProgramatic) {
				// when you referesh page with active company and acitve place first time - you don't have to update place - it takes from router
				isPlaceProgramatic = true;

				this.placeControl.setValue(undefined);
			}

			if (isCompanyProgramatic) {
				isCompanyProgramatic = false;
				return;
			}

			if (!company) {
				return;
			}

			isCompanyProgramatic = true;
			await this._routerService.navigateByUrl(
				ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, company?.id || company)
			);
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
			const company = this.companyControl.value;

			await this._routerService.navigateByUrl(
				ADMIN_ROUTES.PLACE.absolutePath
					.replace(COMPANY_ID, company?.id || company)
					.replace(PLACE_ID, place?.id || place)
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

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}

	emitAddCompanyClick() {
		this.addCompanyClicked.emit();
	}

	emitAddPlaceClick() {
		this.addPlaceClicked.emit();
	}
}
