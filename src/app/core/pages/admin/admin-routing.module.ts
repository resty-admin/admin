import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES as SHARED_ADMIN_ROUTES } from "src/app/shared/routes";

import { AdminComponent } from "./layout/admin.component";

export const ADMIN_ROUTES: Route[] = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{
				...SHARED_ADMIN_ROUTES.COMPANIES,
				loadChildren: () => import("./pages/companies/companies.module").then((m) => m.CompaniesModule)
			},
			{
				...SHARED_ADMIN_ROUTES.COMPANY,
				loadChildren: () => import("./pages/company/company.module").then((m) => m.CompanyModule)
			},
			{
				...SHARED_ADMIN_ROUTES.PROFILE,
				loadChildren: () => import("./pages/profile/profile.module").then((m) => m.ProfileModule)
			},
			{
				path: "**",
				redirectTo: SHARED_ADMIN_ROUTES.COMPANIES.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(ADMIN_ROUTES)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
