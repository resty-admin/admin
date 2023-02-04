import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";

import { FiltersComponent } from "./layout/filters.component";

@NgModule({
	declarations: [FiltersComponent],
	imports: [CommonModule, ReactiveFormsModule, InputModule, IconModule, I18nModule],
	exports: [FiltersComponent]
})
export class FiltersModule {}
