import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";

import { DirectivesModule } from "../../../../shared/modules/directives";
import { ActionsModule } from "../../../../shared/ui/actions";
import { ButtonModule } from "../../../../shared/ui/button";
import { IconModule } from "../../../../shared/ui/icon";
import { ImageModule } from "../../../../shared/ui/image";
import { HallComponent } from "./layout/hall.component";

@NgModule({
	declarations: [HallComponent],
	imports: [CommonModule, ActionsModule, IconModule, TippyDirective, ButtonModule, DirectivesModule, ImageModule],
	exports: [HallComponent]
})
export class HallModule {}
