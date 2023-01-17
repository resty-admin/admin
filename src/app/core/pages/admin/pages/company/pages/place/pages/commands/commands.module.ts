import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ActionsModule } from "src/app/shared/ui/actions";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CommandModule } from "../../../../../../../../../features/commands";
import { CommandDialogModule } from "../../../../../../../../../features/commands/ui/command-dialog/command-dialog.module";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { AddHeaderModule } from "../../../../../../../../../shared/ui/add-header";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
import { TextareaModule } from "../../../../../../../../../shared/ui/textarea";
import { CommandsRoutingModule } from "./commands-routing.module";
import { CommandsComponent } from "./layout/commands.component";

@NgModule({
	declarations: [CommandsComponent],
	imports: [
		CommonModule,
		CommandsRoutingModule,
		InputModule,
		TypographyModule,
		ButtonModule,
		IconModule,
		ActionsModule,
		TooltipModule,
		TranslocoModule,
		AddHeaderModule,
		FiltersModule,
		ListModule,
		TextareaModule,
		ReactiveFormsModule,
		CommandDialogModule,
		CommandModule
	]
})
export class CommandsModule {}
