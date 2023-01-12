import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "src/app/shared/constants";

import { MENU_PAGE_I18N } from "../constants";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
	readonly menuPageI18n = MENU_PAGE_I18N;
	readonly pages = [
		{
			label: "Блюда",
			routerLink: ADMIN_ROUTES.PRODUCTS.path
		},
		{
			label: "Категории",
			routerLink: ADMIN_ROUTES.CATEGORIES.path
		},
		{
			label: "Модификации",
			routerLink: ADMIN_ROUTES.ATTRIBUTES.path
		}
	];
}
