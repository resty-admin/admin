import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { skip } from "rxjs";

import type { CompanyEntity, PlaceEntity } from "../../../../../../../graphql";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "../../../../../../shared/constants";
import type { ISimpleChanges } from "../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../shared/ui/actions";
import { FORM_I18N } from "../../../../../constants";
import { ASIDE_I18N } from "../constants";
import { ASIDE_PAGES } from "../data";
import type { IAsideCompany, IAsidePage, IAsidePlace, IAsideUser } from "../interfaces";
import { ASIDE_PROVIDERS } from "../providers";

@UntilDestroy()
@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: ASIDE_PROVIDERS
})
export class AsideComponent implements OnInit, OnChanges {
	readonly formI18n = FORM_I18N;
	readonly asideI18n = ASIDE_I18N;
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Output() addCompanyClicked = new EventEmitter();
	@Output() addPlaceClicked = new EventEmitter();
	@Output() companyChanged = new EventEmitter<string>();
	@Output() placeChanged = new EventEmitter<string>();
	@Input() isAsideOpen?: boolean;
	@Input() user?: IAsideUser | null = null;
	@Input() companies?: IAsideCompany[] | null = null;
	@Input() places?: IAsidePlace[] | null = null;
	@Input() companyActions?: IAction<CompanyEntity>[] | null;
	@Input() placeActions?: IAction<PlaceEntity>[] | null;
	@Input() activeCompanyId?: string | null;
	@Input() activePlaceId?: string | null;
	readonly adminRoutes = ADMIN_ROUTES;
	readonly companyControl = new FormControl<string | undefined>();
	readonly placeControl = new FormControl<string | undefined>();

	pages: IAsidePage[] = [];

	constructor(private readonly _routerService: RouterService) {}

	ngOnChanges(changes: ISimpleChanges<AsideComponent>) {
		if (changes.activeCompanyId) {
			this.companyControl.setValue(changes.activeCompanyId.currentValue || undefined, { emitValue: false });
		}

		if (changes.activePlaceId) {
			this.placeControl.setValue(changes.activePlaceId.currentValue || undefined, { emitValue: false });
		}

		this.pages = ASIDE_PAGES.map((asidePage) => ({
			...asidePage,
			disabled: !(this.activeCompanyId && this.activePlaceId),
			routerLink: asidePage.routerLink.replace(PLACE_ID, this.activePlaceId!).replace(COMPANY_ID, this.activeCompanyId!)
		})).filter((asidePage) => this.user && asidePage.roles.includes(this.user.role));
	}

	getCompany(id: string) {
		return this.companies?.find((company) => company.id === id) as CompanyEntity;
	}

	getPlace(id: string) {
		return this.places?.find((place) => place.id === id) as PlaceEntity;
	}

	trackByFn(index: number) {
		return index;
	}

	ngOnInit() {
		this.companyControl.valueChanges.pipe(untilDestroyed(this), skip(1)).subscribe((company) => {
			this.companyChanged.emit(company);
		});

		this.placeControl.valueChanges.pipe(untilDestroyed(this), skip(1)).subscribe((place) => {
			this.placeChanged.emit(place);
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
