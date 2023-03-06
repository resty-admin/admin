import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CheckboxModule } from "@shared/ui/checkbox";
import { FileModule } from "@shared/ui/file";
import { InputModule } from "@shared/ui/input";
import { MultipleCheckboxModule } from "@shared/ui/multiple-checkbox";
import { TypographyModule } from "@shared/ui/typography";

import { PlaceDialogComponent } from "./layout/place-dialog.component";

@NgModule({
	declarations: [PlaceDialogComponent],
	imports: [
		CommonModule,
		TypographyModule,
		ReactiveFormsModule,
		FileModule,
		InputModule,
		ButtonModule,
		I18nModule,
		MultipleCheckboxModule,
		CheckboxModule
	],
	exports: [PlaceDialogComponent]
})
export class PlaceDialogModule {}
