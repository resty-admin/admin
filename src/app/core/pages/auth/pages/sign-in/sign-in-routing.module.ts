import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { SignInComponent } from "./layout/sign-in.component";

export const SIGN_IN_ROUTES: Route[] = [
	{
		path: "",
		component: SignInComponent,
		data: {
			animation: "signInPage"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(SIGN_IN_ROUTES)],
	exports: [RouterModule]
})
export class SignInRoutingModule {}
