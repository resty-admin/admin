import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "@shared/ui/button";
import { TypographyModule } from "@shared/ui/typography";

import { ConfirmationDialogComponent } from "./layout/confirmation-dialog.component";

@NgModule({
	imports: [CommonModule, ButtonModule, TypographyModule],
	declarations: [ConfirmationDialogComponent],
	exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule {}
