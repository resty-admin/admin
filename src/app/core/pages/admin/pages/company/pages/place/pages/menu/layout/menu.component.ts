import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routerAnimation } from "@shared/animations";
import { ADMIN_ROUTES } from "@shared/constants";

import { MENU_PAGE } from "../constants";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	animations: [routerAnimation],
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

	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
