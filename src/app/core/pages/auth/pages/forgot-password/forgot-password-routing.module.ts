import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ForgotPasswordComponent } from "./layout/forgot-password.component";

export const FORGOT_PASSWORD_ROUTES: Route[] = [
	{
		path: "",
		component: ForgotPasswordComponent,
		data: {
			animation: "forgotPasswordPage"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(FORGOT_PASSWORD_ROUTES)],
	exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {}
