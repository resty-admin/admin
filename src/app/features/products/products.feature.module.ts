import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "src/app/shared/ui/select";

import { I18nModule } from "../../shared/modules/i18n";
import { ButtonModule } from "../../shared/ui/button";
import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TextareaModule } from "../../shared/ui/textarea";
import { TypographyModule } from "../../shared/ui/typography";
import { PRODUCTS_COMPONENTS } from "./components";

@NgModule({
	declarations: PRODUCTS_COMPONENTS,
	imports: [
		CommonModule,
		ButtonModule,
		TypographyModule,
		InputModule,
		FileModule,
		SelectModule,
		ReactiveFormsModule,
		TextareaModule,
		I18nModule
	],
	exports: PRODUCTS_COMPONENTS
})
export class ProductsFeatureModule {}
