import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActionsModule } from "src/app/shared/ui/actions";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
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
		TranslocoModule
	]
})
export class CommandsModule {}
