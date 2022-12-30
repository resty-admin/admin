import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { COMPANIES_COMPONENTS } from "./components";

@NgModule({
	declarations: COMPANIES_COMPONENTS,
	imports: [CommonModule, TypographyModule, InputModule, FileModule, ReactiveFormsModule],
	exports: COMPANIES_COMPONENTS
})
export class CompaniesFeatureModule {}
