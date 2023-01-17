import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PaymentSystemComponent } from "./layout/payment-system.component";

@NgModule({
	declarations: [PaymentSystemComponent],
	imports: [CommonModule],
	exports: [PaymentSystemComponent]
})
export class PaymentSystemModule {}
