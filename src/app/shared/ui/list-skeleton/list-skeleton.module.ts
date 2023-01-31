import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ListSkeletonComponent } from "./layout/list-skeleton.component";

@NgModule({
	declarations: [ListSkeletonComponent],
	imports: [CommonModule, RouterModule],
	exports: [ListSkeletonComponent]
})
export class ListSkeletonModule {}
