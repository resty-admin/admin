import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES } from "@shared/constants";

import { MenuComponent } from "./layout/menu.component";

export const MENU_ROUTES: Route[] = [
	{
		path: "",
		component: MenuComponent,
		data: {
			animation: "menuPage"
		},
		children: [
			{
				...ADMIN_ROUTES.CATEGORIES,
				loadChildren: () => import("./pages/categories/categories.module").then((m) => m.CategoriesModule)
			},
			{
				...ADMIN_ROUTES.PRODUCTS,
				loadChildren: () => import("./pages/products/products.module").then((m) => m.ProductsModule)
			},
			{
				...ADMIN_ROUTES.ATTRIBUTES,
				loadChildren: () => import("./pages/attributes/attributes.module").then((m) => m.AttributesModule)
			},
			{
				path: "",
				pathMatch: "full",
				redirectTo: ADMIN_ROUTES.PRODUCTS.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(MENU_ROUTES)],
	exports: [RouterModule]
})
export class MenuRoutingModule {}
