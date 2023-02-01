import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";
import { DirectivesModule } from "@shared/modules/directives";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { MoreModule } from "@shared/ui/more";

import { TableComponent } from "./layout/table.component";

@NgModule({
	declarations: [TableComponent],
	imports: [
		CommonModule,
		ActionsModule,
		ButtonModule,
		TippyDirective,
		IconModule,
		ImageModule,
		DirectivesModule,
		MoreModule
	],
	exports: [TableComponent]
})
export class TableModule {}
