import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HallModule } from "@features/halls";
import { HallDialogModule } from "@features/halls/ui/hall-dialog/hall-dialog.module";
import { DirectivesModule } from "@shared/modules/directives";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddHeaderModule } from "@shared/ui/add-header";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { HALLS_COMPONENTS } from "./components";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";
import { HALLS_PROVIDERS } from "./providers";

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
		TranslocoModule,
		FiltersModule,
		AddHeaderModule,
		ListModule,
		HallDialogModule,
		HallModule
	],
	providers: HALLS_PROVIDERS
})
export class HallsModule {}
