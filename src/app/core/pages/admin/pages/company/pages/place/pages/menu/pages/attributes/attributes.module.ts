import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TippyDirective } from "@ngneat/helipopper";
import { AttributesFeatureModule } from "src/app/features/attributes";
import { ActionsModule } from "src/app/shared/ui/actions";
import { ButtonModule } from "src/app/shared/ui/button";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ToggleModule } from "../../../../../../../../../../../shared/ui/toggle";
import { AttributesRoutingModule } from "./attributes-routing.module";
import { AttributesComponent } from "./layout/attributes.component";

@NgModule({
	declarations: [AttributesComponent],
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
		ToggleModule,
		AttributesFeatureModule,
		TranslocoModule
	]
})
export class AttributesModule {}
