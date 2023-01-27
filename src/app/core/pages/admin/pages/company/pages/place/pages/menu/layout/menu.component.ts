import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "@shared/constants";

import { MENU_PAGE } from "../constants";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
	readonly menuPage = MENU_PAGE;
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
