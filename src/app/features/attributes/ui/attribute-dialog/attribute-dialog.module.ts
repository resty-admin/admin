import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { I18nModule } from "../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../shared/ui/button";
import { FileModule } from "../../../../shared/ui/file";
import { InputModule } from "../../../../shared/ui/input";
import { SelectModule } from "../../../../shared/ui/select";
import { TypographyModule } from "../../../../shared/ui/typography";
import { AttributeDialogComponent } from "./layout/attribute-dialog.component";

@NgModule({
	declarations: [AttributeDialogComponent],
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
	exports: [AttributeDialogComponent]
})
export class AttributeDialogModule {}
