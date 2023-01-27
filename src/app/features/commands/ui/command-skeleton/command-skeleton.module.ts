import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { CommandSkeletonComponent } from "./layout/command-skeleton.component";

@NgModule({
	declarations: [CommandSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [CommandSkeletonComponent]
})
export class CommandSkeletonModule {}
