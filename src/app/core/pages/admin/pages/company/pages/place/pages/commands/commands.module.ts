import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ActionsModule } from "src/app/shared/ui/actions";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CommandDialogModule } from "../../../../../../../../../features/commands/ui/command-dialog/command-dialog.module";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { AddHeaderModule } from "../../../../../../../../../shared/ui/add-header";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
import { TextareaModule } from "../../../../../../../../../shared/ui/textarea";
import { CommandsRoutingModule } from "./commands-routing.module";
import { COMMANDS_COMPONENTS } from "./components";
import { CommandsComponent } from "./layout/commands.component";
import { COMMANDS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CommandsComponent, ...COMMANDS_COMPONENTS],
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
		CommandDialogModule
	],
	providers: COMMANDS_PROVIDERS
})
export class CommandsModule {}
