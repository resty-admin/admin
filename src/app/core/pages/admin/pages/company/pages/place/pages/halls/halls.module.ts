import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "src/app/shared/modules/directives";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogModule } from "../../../../../../../../../shared/ui/confirmation-dialog";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { HALLS_COMPONENTS } from "./components";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";

@NgModule({
	declarations: [HallsComponent, ...HALLS_COMPONENTS],
	imports: [
		CommonModule,
		HallsRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		FileModule,
		IconModule,
		ImageModule,
		ActionsModule,
		TooltipModule,
		DirectivesModule,
		ConfirmationDialogModule
	],
	exports: [HallsComponent]
})
export class HallsModule {}
