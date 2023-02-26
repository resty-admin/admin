import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ACCESS_TOKEN } from "@shared/constants";

import { ResetPasswordComponent } from "./layout/reset-password.component";

export const RESET_PASSWORD_ROUTES: Route[] = [
	{
		path: `:${ACCESS_TOKEN}`,
		component: ResetPasswordComponent,
		data: {
			animation: "resetPasswordPage"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(RESET_PASSWORD_ROUTES)],
	exports: [RouterModule]
})
export class ResetPasswordRoutingModule {}
