import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { TablesSelectSkeletonComponent } from "./layout/tables-select-skeleton.component";

@NgModule({
	declarations: [TablesSelectSkeletonComponent],
	imports: [CommonModule, SkeletonModule, ImageModule],
	exports: [TablesSelectSkeletonComponent]
})
export class TablesSelectSkeletonModule {}
