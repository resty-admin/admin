import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

import { NavigationSkeletonComponent } from "./layout/navigation-skeleton.component";

@NgModule({
	declarations: [NavigationSkeletonComponent],
	imports: [CommonModule, NgxSkeletonLoaderModule],
	exports: [NavigationSkeletonComponent]
})
export class NavigationSkeletonModule {}
