import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { PipesModule } from "../../modules/pipes";
import { IosDatepickerComponent } from "./layout/ios-datepicker.component";

@NgModule({
	declarations: [IosDatepickerComponent],
	imports: [CommonModule, ReactiveFormsModule, PipesModule],
	exports: [IosDatepickerComponent]
})
export class IosDatepickerModule {}
