import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { I18nModule } from "../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../shared/ui/button";
import { FileModule } from "../../../../shared/ui/file";
import { InputModule } from "../../../../shared/ui/input";
import { TypographyModule } from "../../../../shared/ui/typography";
import { PlaceDialogComponent } from "./layout/place-dialog.component";

@NgModule({
	declarations: [PlaceDialogComponent],
	imports: [CommonModule, TypographyModule, ReactiveFormsModule, FileModule, InputModule, ButtonModule, I18nModule],
	exports: [PlaceDialogComponent]
})
export class PlaceDialogModule {}
