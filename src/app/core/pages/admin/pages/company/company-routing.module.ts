import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES as SHARED_ADMIN_ROUTES } from "@shared/constants";

import { CompanyComponent } from "./layout/company.component";

export const COMPANY_ROUTES: Route[] = [
	{
		path: "",
		component: CompanyComponent,
		children: [
			{
				...SHARED_ADMIN_ROUTES.PLACES,
				loadChildren: () => import("./pages/places/places.module").then((m) => m.PlacesModule)
			},
			{
				...SHARED_ADMIN_ROUTES.PLACE,
				loadChildren: () => import("./pages/place/place.module").then((m) => m.PlaceModule)
			},
			{
				path: "**",
				redirectTo: SHARED_ADMIN_ROUTES.PLACES.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(COMPANY_ROUTES)],
	exports: [RouterModule]
})
export class CompanyRoutingModule {}
