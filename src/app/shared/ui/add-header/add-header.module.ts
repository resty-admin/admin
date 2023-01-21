import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { TypographyModule } from "@shared/ui/typography";

import { AddHeaderComponent } from "./layout/add-header.component";

@NgModule({
	declarations: [AddHeaderComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputModule,
		IconModule,
		TranslocoModule,
		TypographyModule,
		ButtonModule
	],
	exports: [AddHeaderComponent]
})
export class AddHeaderModule {}
