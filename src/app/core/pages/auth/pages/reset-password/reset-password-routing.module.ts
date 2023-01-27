import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { RESET_PASSWORD_PAGE } from "./constants";
import { ResetPasswordComponent } from "./layout/reset-password.component";

export const RESET_PASSWORD_ROUTES: Route[] = [
	{
		path: "",
		component: ResetPasswordComponent,
		data: {
			animation: RESET_PASSWORD_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(RESET_PASSWORD_ROUTES)],
	exports: [RouterModule]
})
export class ResetPasswordRoutingModule {}
