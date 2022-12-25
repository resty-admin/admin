import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CompaniesComponent } from "./layout/companies.component";

export const COMPNAIES_ROUTES: Route[] = [
	{
		path: "",
		component: CompaniesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMPNAIES_ROUTES)],
	exports: [RouterModule]
})
export class CompaniesRoutingModule {}
