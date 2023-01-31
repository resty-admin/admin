import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ProductsPageSkeletonComponent } from "./components";
import { PRODUCTS_PAGE } from "./constants";
import { ProductsComponent } from "./layout/products.component";
import { ProductsPageResolver } from "./resolvers";

export const PRODUCTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ProductsComponent,
		data: {
			animation: PRODUCTS_PAGE
		},
		resolve: {
			products: ProductsPageResolver
		},
		skeleton: {
			component: ProductsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ROUTES)],
	exports: [RouterModule]
})
export class ProductsRoutingModule {}
