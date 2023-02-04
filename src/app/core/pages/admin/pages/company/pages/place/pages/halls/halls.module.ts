import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HallModule, HallSkeletonModule } from "@features/halls";
import { HallDialogModule } from "@features/halls/ui/hall-dialog/hall-dialog.module";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddButtonModule } from "@shared/ui/add-button";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { HALLS_COMPONENTS } from "./components";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";

@NgModule({
	declarations: [HallsComponent, ...HALLS_COMPONENTS],
	imports: [
		CommonModule,
		HallsRoutingModule,
		InputModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		ActionsModule,
		TooltipModule,
		DirectivesModule,
		I18nModule,
		FiltersModule,
		ListModule,
		HallDialogModule,
		HallModule,
		FiltersSkeletonModule,
		ListSkeletonModule,
		HallSkeletonModule,
		SkeletonModule,
		AddButtonModule
	]
})
export class HallsModule {}
