import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { OrderInfoSkeletonComponent } from "./layout/order-info-skeleton.component";

@NgModule({
	declarations: [OrderInfoSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [OrderInfoSkeletonComponent]
})
export class OrderInfoSkeletonModule {}
