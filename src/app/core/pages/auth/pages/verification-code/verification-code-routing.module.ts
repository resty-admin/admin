import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { VERIFICATION_CODE_PAGE } from "./constants";
import { VerificationCodeComponent } from "./layout/verification-code.component";

export const VERIFICATION_CODE_ROUTES: Route[] = [
	{
		path: "",
		component: VerificationCodeComponent,
		data: {
			animation: VERIFICATION_CODE_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(VERIFICATION_CODE_ROUTES)],
	exports: [RouterModule]
})
export class VerificationCodeRoutingModule {}
