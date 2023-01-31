import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { FileModule } from "@shared/ui/file";
import { InputModule } from "@shared/ui/input";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { CommandDialogComponent } from "./layout/command-dialog.component";
import { COMMAND_DIALOG_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CommandDialogComponent],
	imports: [
		CommonModule,
		TypographyModule,
		ReactiveFormsModule,
		FileModule,
		InputModule,
		TextareaModule,
		ButtonModule,
		I18nModule
	],
	providers: COMMAND_DIALOG_PROVIDERS,
	exports: [CommandDialogComponent]
})
export class CommandDialogModule {}
