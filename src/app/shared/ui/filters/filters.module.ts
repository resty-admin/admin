import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { TranslocoModule } from "../../modules/i18n";
import { IconModule } from "../icon";
import { InputModule } from "../input";
import { FiltersComponent } from "./layout/filters.component";

@NgModule({
	declarations: [FiltersComponent],
	imports: [CommonModule, ReactiveFormsModule, InputModule, IconModule, TranslocoModule],
	exports: [FiltersComponent]
})
export class FiltersModule {}
