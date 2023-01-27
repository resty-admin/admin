import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AttributeDialogModule } from "@features/attributes/ui/attribute-dialog/attribute-dialog.module";
import { AttributeGroupDialogModule } from "@features/attributes/ui/attribute-group-dialog/attribute-group-dialog.module";
import { TippyDirective } from "@ngneat/helipopper";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { FileModule } from "@shared/ui/file";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { ToggleModule } from "@shared/ui/toggle";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { AttributesRoutingModule } from "./attributes-routing.module";
import { ATTRIUTES_COMPONENTS } from "./components";
import { AttributesComponent } from "./layout/attributes.component";
import { ATTRIBUTES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AttributesComponent, ATTRIUTES_COMPONENTS],
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
