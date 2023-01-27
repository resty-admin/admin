import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommandModule } from "@features/commands";
import { CommandDialogModule } from "@features/commands/ui";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddHeaderModule } from "@shared/ui/add-header";
import { ButtonModule } from "@shared/ui/button";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { TextareaModule } from "@shared/ui/textarea";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

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
		CommandDialogModule,
		CommandModule
	],
	providers: COMMANDS_PROVIDERS
})
export class CommandsModule {}
