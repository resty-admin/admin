import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { PaymentSystemSkeletonComponent } from "./layout/payment-system-skeleton.component";

@NgModule({
	declarations: [PaymentSystemSkeletonComponent],
	imports: [CommonModule, TypographyModule, SkeletonModule],
	exports: [PaymentSystemSkeletonComponent]
})
export class PaymentSystemSkeletonModule {}
