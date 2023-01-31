import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ACCESS_TOKEN } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";

import { AUTH_PAGE } from "../../constants";

export const SIGN_IN_ROUTES: Route[] = [
	{
		path: `:${ACCESS_TOKEN}`,
		data: {
			animation: AUTH_PAGE
		}
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: ADMIN_ROUTES.SIGN_IN.absolutePath
	}
];

@NgModule({
	imports: [RouterModule.forChild(SIGN_IN_ROUTES)],
	exports: [RouterModule]
})
export class GoogleRoutingModule {}
