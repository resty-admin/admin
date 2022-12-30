import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "src/app/shared/ui/select";

import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { PRODUCTS_COMPONENTS } from "./components";

@NgModule({
	declarations: PRODUCTS_COMPONENTS,
	imports: [CommonModule, TypographyModule, InputModule, FileModule, SelectModule, ReactiveFormsModule],
	exports: PRODUCTS_COMPONENTS
})
export class ProductsFeatureModule {}
