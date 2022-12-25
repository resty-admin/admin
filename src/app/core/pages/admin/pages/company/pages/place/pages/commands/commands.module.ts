import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "src/app/shared/modules/directives";
import { ActionsModule } from "src/app/shared/ui/actions";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { TextareaModule } from "src/app/shared/ui/textarea";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CommandsRoutingModule } from "./commands-routing.module";
import { COMMANDS_COMPONENTS } from "./components";
import { CommandsComponent } from "./layout/commands.component";

@NgModule({
	declarations: [CommandsComponent, ...COMMANDS_COMPONENTS],
	imports: [
		CommonModule,
		CommandsRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		TextareaModule,
		ActionsModule,
		TooltipModule,
		DirectivesModule
	],
	exports: [CommandsComponent]
})
export class CommandsModule {}
