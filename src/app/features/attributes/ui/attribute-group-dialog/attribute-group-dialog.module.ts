import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { FileModule } from "@shared/ui/file";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { TypographyModule } from "@shared/ui/typography";

import { AttributeGroupDialogComponent } from "./layout/attribute-group-dialog.component";
import { ATTRIBUTE_GROUP_DIALOG_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AttributeGroupDialogComponent],
	imports: [
		CommonModule,
		TypographyModule,
		ReactiveFormsModule,
		FileModule,
		InputModule,
		ButtonModule,
		SelectModule,
		I18nModule
	],
	providers: ATTRIBUTE_GROUP_DIALOG_PROVIDERS,
	exports: [AttributeGroupDialogComponent]
})
export class AttributeGroupDialogModule {}
