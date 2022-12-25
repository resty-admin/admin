import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ResetPasswordComponent } from "./layout/reset-password.component";

export const RESET_PASSWORD_ROUTES: Route[] = [
	{
		path: "",
		component: ResetPasswordComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(RESET_PASSWORD_ROUTES)],
	exports: [RouterModule]
})
export class ResetPasswordRoutingModule {}
