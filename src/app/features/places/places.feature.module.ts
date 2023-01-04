import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { I18nModule } from "../../shared/modules/i18n";
import { ButtonModule } from "../../shared/ui/button";
import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { PLACES_COMPONENTS } from "./components";

@NgModule({
	declarations: PLACES_COMPONENTS,
	imports: [CommonModule, ButtonModule, TypographyModule, InputModule, FileModule, ReactiveFormsModule, I18nModule],
	exports: PLACES_COMPONENTS
})
export class PlacesFeatureModule {}
