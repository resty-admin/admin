import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductToOrderSkeletonModule } from "@features/products/ui/product-to-order-skeleton";
import { SkeletonModule } from "@shared/ui/skeleton";

import { ProductsToOrderSelectSkeletonComponent } from "./layout/products-to-order-select-skeleton.component";

@NgModule({
	declarations: [ProductsToOrderSelectSkeletonComponent],
	imports: [CommonModule, SkeletonModule, ProductToOrderSkeletonModule],
	exports: [ProductsToOrderSelectSkeletonComponent]
})
export class ProductsToOrderSelectSkeletonModule {}
