import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { FiltersSkeletonComponent } from "./layout/filters-skeleton.component";

@NgModule({
	declarations: [FiltersSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [FiltersSkeletonComponent]
})
export class FiltersSkeletonModule {}
