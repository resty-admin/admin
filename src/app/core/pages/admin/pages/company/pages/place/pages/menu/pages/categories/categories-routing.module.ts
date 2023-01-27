import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CategoriesSkeletonComponent } from "./components";
import { CATEGORIES_PAGE } from "./constants";
import { CategoriesComponent } from "./layout/categories.component";
import { CategoriesResolver } from "./resolvers";

export const CATEGORIES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CategoriesComponent,
		data: {
			animation: CATEGORIES_PAGE
		},
		resolve: {
			places: CategoriesResolver
		},
		skeleton: {
			component: CategoriesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CATEGORIES_ROUTES)],
	exports: [RouterModule]
})
export class CategoriesRoutingModule {}
