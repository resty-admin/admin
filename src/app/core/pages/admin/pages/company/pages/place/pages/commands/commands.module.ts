import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommandModule, CommandSkeletonModule } from "@features/commands";
import { CommandDialogModule } from "@features/commands/ui";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddHeaderModule } from "@shared/ui/add-header";
import { AddHeaderSkeletonModule } from "@shared/ui/add-header-skeleton";
import { ButtonModule } from "@shared/ui/button";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TextareaModule } from "@shared/ui/textarea";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { CommandsRoutingModule } from "./commands-routing.module";
import { COMMANDS_COMPONENTS } from "./components";
import { CommandsComponent } from "./layout/commands.component";

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
		CommandModule,
		SkeletonModule,
		FiltersSkeletonModule,
		ListSkeletonModule,
		AddHeaderSkeletonModule,
		CommandSkeletonModule
	]
})
export class CommandsModule {}
