import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SelectedTablesSkeletonComponent } from "./layout/selected-tables-skeleton.component";

@NgModule({
	declarations: [SelectedTablesSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [SelectedTablesSkeletonComponent]
})
export class SelectedTablesSkeletonModule {}
