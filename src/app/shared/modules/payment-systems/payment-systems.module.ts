import { NgModule } from "@angular/core";

import { PAYMENT_SYSTEMS_COMPONENTS } from "./components";

@NgModule({
	declarations: PAYMENT_SYSTEMS_COMPONENTS,
	exports: PAYMENT_SYSTEMS_COMPONENTS
})
export class PaymentSystemsModule {}
