import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { TooltipModule } from "@shared/ui/tooltip";

import { IconModule } from "../icon";
import { MoreComponent } from "./layout/more.component";

@NgModule({
	declarations: [MoreComponent],
	imports: [CommonModule, IconModule, ButtonModule, TooltipModule, DirectivesModule, I18nModule],
	exports: [MoreComponent]
})
export class MoreModule {}
