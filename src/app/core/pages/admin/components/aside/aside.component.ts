import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs";
import { COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import type { AtLeast, ICompany, IPlace, ISimpleChanges, IUser } from "src/app/shared/interfaces";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { RouterService } from "../../../../../shared/modules/router";
// import type { IPlace, IUser } from "src/app/shared/interfaces";
// import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "src/app/shared/enums";
import { AuthService } from "../../../auth/services";

const PAGES = [
	{
		label: "Дешборд",
		icon: "dashboard",
		routerLink: ADMIN_ROUTES.DASHBOARD.absolutePath
	},
	{
		label: "Смена",
		icon: "shift",
		routerLink: ADMIN_ROUTES.SHIFT.absolutePath
	},
	{
		label: "Заказы",
		icon: "orders",
		routerLink: ADMIN_ROUTES.ORDERS.absolutePath
	},
	{
		label: "Меню",
		icon: "menu",
		routerLink: ADMIN_ROUTES.MENU.absolutePath
	},
	{
		label: "Залы",
		icon: "halls",
		routerLink: ADMIN_ROUTES.HALLS.absolutePath
	},
	{
		label: "Пользователи",
		icon: "users",
		routerLink: ADMIN_ROUTES.USERS.absolutePath
	},
	{
		label: "Команды",
		icon: "commands",
		routerLink: ADMIN_ROUTES.COMMANDS.absolutePath
	},
	{
		label: "Кошелек",
		icon: "wallet",
		routerLink: ADMIN_ROUTES.WALLET.absolutePath
	},
	{
		label: "Договор",
		icon: "contract",
		routerLink: ADMIN_ROUTES.CONTRACT.absolutePath
	},
	{
		label: "Системы учета",
		icon: "accounting-systems",
		routerLink: ADMIN_ROUTES.ACCOUNTING_SYSTEMS.absolutePath
	},
	{
		label: "Платежные системы",
		icon: "payment-systems",
		routerLink: ADMIN_ROUTES.PAYMENT_SYSTEMS.absolutePath
	}
];

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

	pages: any[] = [];

	readonly companyControl = new FormControl<AtLeast<ICompany, "id">>();
	readonly placeControl = new FormControl<AtLeast<IPlace, "id">>();

	constructor(private readonly _authService: AuthService, private readonly _routerService: RouterService) {}

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
