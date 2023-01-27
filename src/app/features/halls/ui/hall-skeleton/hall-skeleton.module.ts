import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { HallSkeletonComponent } from "./layout/hall-skeleton.component";

@NgModule({
	declarations: [HallSkeletonComponent],
	imports: [CommonModule, SkeletonModule, ImageModule],
	exports: [HallSkeletonComponent]
})
export class HallSkeletonModule {}
