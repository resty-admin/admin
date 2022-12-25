import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ACCESS_TOKEN } from "src/app/shared/constants";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { GoogleComponent } from "./layout/google.component";

export const SIGN_IN_ROUTES: Route[] = [
	{
		path: `:${ACCESS_TOKEN}`,
		component: GoogleComponent
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
