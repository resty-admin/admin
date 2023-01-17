import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "src/app/shared/modules/directives";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { HallModule } from "../../../../../../../../../features/halls";
import { HallDialogModule } from "../../../../../../../../../features/halls/ui/hall-dialog/hall-dialog.module";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { AddHeaderModule } from "../../../../../../../../../shared/ui/add-header";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";
import { HALLS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HallsComponent],
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
