import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { AddHeaderSkeletonComponent } from "./layout/add-header-skeleton.component";

@NgModule({
	declarations: [AddHeaderSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [AddHeaderSkeletonComponent]
})
export class AddHeaderSkeletonModule {}
