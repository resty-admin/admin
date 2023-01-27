import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CompaniesSkeletonComponent } from "./components";
import { COMPANIES_PAGE } from "./constants";
import { CompaniesComponent } from "./layout/companies.component";
import { CompaniesResolver } from "./resolvers";

export const COMPNAIES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CompaniesComponent,
		data: {
			animation: COMPANIES_PAGE
		},
		resolve: {
			places: CompaniesResolver
		},
		skeleton: {
			component: CompaniesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMPNAIES_ROUTES)],
	exports: [RouterModule]
})
export class CompaniesRoutingModule {}
