import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";
import { DirectivesModule } from "@shared/modules/directives";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { TableSkeletonComponent } from "./layout/table-skeleton.component";

@NgModule({
	declarations: [TableSkeletonComponent],
	imports: [
		CommonModule,
		ActionsModule,
		ButtonModule,
		TippyDirective,
		IconModule,
		ImageModule,
		DirectivesModule,
		SkeletonModule
	],
	exports: [TableSkeletonComponent]
})
export class TableSkeletonModule {}
