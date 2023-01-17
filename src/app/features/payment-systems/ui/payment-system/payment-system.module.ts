import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TypographyModule } from "../../../../shared/ui/typography";
import { PaymentSystemComponent } from "./layout/payment-system.component";

@NgModule({
	declarations: [PaymentSystemComponent],
	imports: [CommonModule, TypographyModule],
	exports: [PaymentSystemComponent]
})
export class PaymentSystemModule {}
