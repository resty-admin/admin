import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { PaymentSystemsComponent } from "./layout/payment-systems.component";

export const PAYMENT_SYSTEMS_ROUTES: Route[] = [
	{
		path: "",
		component: PaymentSystemsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_SYSTEMS_ROUTES)],
	exports: [RouterModule]
})
export class PaymentSystemsRoutingModule {}
