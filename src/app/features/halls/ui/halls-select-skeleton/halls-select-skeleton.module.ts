import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { HallsSelectSkeletonComponent } from "./layout/halls-select-skeleton.component";

@NgModule({
	declarations: [HallsSelectSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [HallsSelectSkeletonComponent]
})
export class HallsSelectSkeletonModule {}
