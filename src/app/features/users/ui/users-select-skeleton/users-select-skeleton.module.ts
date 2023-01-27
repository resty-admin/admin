import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { UsersSelectSkeletonComponent } from "./layout/users-select-skeleton.component";

@NgModule({
	declarations: [UsersSelectSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [UsersSelectSkeletonComponent]
})
export class UsersSelectSkeletonModule {}
