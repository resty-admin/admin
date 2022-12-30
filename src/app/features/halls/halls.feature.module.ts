import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { HALLS_COMPONENTS } from "./components";

@NgModule({
	declarations: HALLS_COMPONENTS,
	imports: [CommonModule, TypographyModule, InputModule, FileModule, ReactiveFormsModule],
	exports: HALLS_COMPONENTS
})
export class PlacesFeatureModule {}
