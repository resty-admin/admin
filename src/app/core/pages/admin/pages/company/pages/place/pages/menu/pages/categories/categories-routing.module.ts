import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CategoriesComponent } from "./layout/categories.component";

export const CATEGORIES_ROUTES: Route[] = [
	{
		path: "",
		component: CategoriesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(CATEGORIES_ROUTES)],
	exports: [RouterModule]
})
export class CategoriesRoutingModule {}
