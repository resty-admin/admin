import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TippyDirective } from "@ngneat/helipopper";
import { ActionsModule } from "src/app/shared/ui/actions";
import { ButtonModule } from "src/app/shared/ui/button";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ToggleModule } from "../../../../../../../../../../../shared/ui/toggle";
import { AttributesRoutingModule } from "./attributes-routing.module";
import { ATTRIBUTES_COMPONENTS } from "./components";
import { AttributesComponent } from "./layout/attributes.component";

@NgModule({
	declarations: [AttributesComponent, ...ATTRIBUTES_COMPONENTS],
	imports: [
		CommonModule,
		AttributesRoutingModule,
		ButtonModule,
		InputModule,
		SelectModule,
		FileModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule,
		TypographyModule,
		TooltipModule,
		ActionsModule,
		TippyDirective,
		ToggleModule
	],
	exports: [AttributesComponent]
})
export class AttributesModule {}
