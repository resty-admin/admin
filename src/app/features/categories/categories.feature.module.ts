import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "src/app/shared/ui/select";

import { I18nModule } from "../../shared/modules/i18n";
import { ButtonModule } from "../../shared/ui/button";
import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { CATEGORIES_COMPONENTS } from "./components";

@NgModule({
	declarations: CATEGORIES_COMPONENTS,
	imports: [
		CommonModule,
		ButtonModule,
		TypographyModule,
		InputModule,
		FileModule,
		SelectModule,
		ReactiveFormsModule,
		I18nModule
	],
	exports: CATEGORIES_COMPONENTS
})
export class CategoriesFeatureModule {}
