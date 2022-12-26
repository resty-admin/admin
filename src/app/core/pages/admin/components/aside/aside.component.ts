import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import type { IPlace, IUser } from "src/app/shared/interfaces";
import { ADMIN_ROUTES } from "src/app/shared/routes";

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

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent implements OnChanges {
	@Output() linkClicked = new EventEmitter();
	@Output() addPlaceClicked = new EventEmitter();
	@Output() addCompanyClicked = new EventEmitter();

	readonly companyId = COMPANY_ID;
	readonly placeId = PLACE_ID;
	readonly adminRoutes = ADMIN_ROUTES;

	@Input() places?: IPlace[] | null;
	@Input() companies?: IPlace[] | null;

	@Input() activeCompanyId = "";
	@Input() activePlaceId = "";
	@Input() user?: IUser | null;

	pages: any[] = [];

	readonly companyControl = new FormControl();
	readonly placeControl = new FormControl();

	constructor(private readonly _authService: AuthService) {}

	ngOnChanges() {
		this.pages = PAGES.map((page) => ({
			...page,
			routerLink: page.routerLink
				.replace(this.companyId, this.activeCompanyId)
				.replace(this.placeId, this.activePlaceId)
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
