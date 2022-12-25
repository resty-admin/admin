import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ProductsComponent } from "./layout/products.component";

export const PRODUCTS_ROUTES: Route[] = [
	{
		path: "",
		component: ProductsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ROUTES)],
	exports: [RouterModule]
})
export class ProductsRoutingModule {}
