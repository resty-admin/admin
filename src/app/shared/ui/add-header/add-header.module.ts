import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { TranslocoModule } from "../../modules/i18n";
import { ButtonModule } from "../button";
import { IconModule } from "../icon";
import { InputModule } from "../input";
import { TypographyModule } from "../typography";
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
