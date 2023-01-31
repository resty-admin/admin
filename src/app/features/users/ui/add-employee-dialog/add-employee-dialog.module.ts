import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { FileModule } from "@shared/ui/file";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { TypographyModule } from "@shared/ui/typography";

import { AddEmployeeDialogComponent } from "./layout/add-employee-dialog.component";
import { ADD_EMPLOYEE_DIALOG_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AddEmployeeDialogComponent],
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
	providers: ADD_EMPLOYEE_DIALOG_PROVIDERS,
	exports: [AddEmployeeDialogComponent]
})
export class AddEmployeeDialogModule {}
