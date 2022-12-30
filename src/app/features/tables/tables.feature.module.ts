import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { TABLES_COMPONENTS } from "./components";

@NgModule({
	declarations: TABLES_COMPONENTS,
	imports: [CommonModule, TypographyModule, InputModule, FileModule, ReactiveFormsModule],
	exports: TABLES_COMPONENTS
})
export class TablesFeatureModule {}
