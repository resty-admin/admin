import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { SIGN_UP_PAGE } from "./constants";
import { SignUpComponent } from "./layout/sign-up.component";

export const SIGN_UP_ROUTES: Route[] = [
	{
		path: "",
		component: SignUpComponent,
		data: {
			animation: SIGN_UP_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(SIGN_UP_ROUTES)],
	exports: [RouterModule]
})
export class SignUpRoutingModule {}
