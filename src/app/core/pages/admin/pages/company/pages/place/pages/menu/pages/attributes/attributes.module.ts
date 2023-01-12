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

import { AttributeDialogModule } from "../../../../../../../../../../../features/attributes/ui/attribute-dialog/attribute-dialog.module";
import { AttributeGroupDialogModule } from "../../../../../../../../../../../features/attributes/ui/attribute-group-dialog/attribute-group-dialog.module";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { FiltersModule } from "../../../../../../../../../../../shared/ui/filters";
import { ToggleModule } from "../../../../../../../../../../../shared/ui/toggle";
import { AttributesRoutingModule } from "./attributes-routing.module";
import { AttributesComponent } from "./layout/attributes.component";
import { ATTRIBUTES_PROVIDERS } from "./providers";

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
		TranslocoModule,
		FiltersModule,
		AttributeDialogModule,
		AttributeGroupDialogModule
	],
	providers: ATTRIBUTES_PROVIDERS
})
export class AttributesModule {}
