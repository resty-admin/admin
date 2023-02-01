import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CompaniesPageSkeletonComponent } from "./components";
import { CompaniesComponent } from "./layout/companies.component";
import { CompaniesPageResolver } from "./resolvers";

export const COMPNAIES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CompaniesComponent,
		data: {
			animation: "companiesPage"
		},
		resolve: {
			companies: CompaniesPageResolver
		},
		skeleton: {
			component: CompaniesPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMPNAIES_ROUTES)],
	exports: [RouterModule]
})
export class CompaniesRoutingModule {}
