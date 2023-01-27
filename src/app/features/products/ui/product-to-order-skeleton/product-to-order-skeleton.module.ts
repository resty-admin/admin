import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { ProductToOrderSkeletonComponent } from "./layout/product-to-order-skeleton.component";

@NgModule({
	declarations: [ProductToOrderSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [ProductToOrderSkeletonComponent]
})
export class ProductToOrderSkeletonModule {}
