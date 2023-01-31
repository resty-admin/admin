import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { DatatableSkeletonComponent } from "./layout/datatable-skeleton.component";

@NgModule({
	declarations: [DatatableSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [DatatableSkeletonComponent]
})
export class DatatableSkeletonModule {}
