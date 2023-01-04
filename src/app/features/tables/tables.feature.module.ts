import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { I18nModule } from "../../shared/modules/i18n";
import { ButtonModule } from "../../shared/ui/button";
import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { TABLES_COMPONENTS } from "./components";

@NgModule({
	declarations: TABLES_COMPONENTS,
	imports: [CommonModule, ButtonModule, TypographyModule, InputModule, FileModule, ReactiveFormsModule, I18nModule],
	exports: TABLES_COMPONENTS
})
export class TablesFeatureModule {}
