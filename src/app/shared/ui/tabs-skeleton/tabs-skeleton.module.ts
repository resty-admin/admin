import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { TabsSkeletonComponent } from "./layout/tabs-skeleton.component";

@NgModule({
	declarations: [TabsSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [TabsSkeletonComponent]
})
export class TabsSkeletonModule {}
