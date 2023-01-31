import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { MoreModule } from "@shared/ui/more";
import { TypographyModule } from "@shared/ui/typography";

import { CommandComponent } from "./layout/command.component";

@NgModule({
	declarations: [CommandComponent],
	exports: [CommandComponent],
	imports: [CommonModule, TypographyModule, ActionsModule, IconModule, ButtonModule, TippyDirective, MoreModule]
})
export class CommandModule {}
