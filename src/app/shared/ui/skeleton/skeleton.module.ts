import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

import { SKELETON_COMPONENTS } from "./components";
import { SkeletonComponent } from "./layout/skeleton.component";

@NgModule({
	declarations: [SkeletonComponent, ...SKELETON_COMPONENTS],
	imports: [CommonModule, NgxSkeletonLoaderModule],
	exports: [SkeletonComponent, ...SKELETON_COMPONENTS]
})
export class SkeletonModule {}
