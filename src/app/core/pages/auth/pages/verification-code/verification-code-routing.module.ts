import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { VerificationCodeComponent } from "./layout/verification-code.component";

export const VERIFICATION_CODE_ROUTES: Route[] = [
	{
		path: "",
		component: VerificationCodeComponent,
		data: {
			animation: "verificationCodePage"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(VERIFICATION_CODE_ROUTES)],
	exports: [RouterModule]
})
export class VerificationCodeRoutingModule {}
