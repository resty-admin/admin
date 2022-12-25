import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MultipleCheckboxComponent } from "./layout/multiple-checkbox.component";

@NgModule({
	declarations: [MultipleCheckboxComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [MultipleCheckboxComponent]
})
export class MultipleCheckboxModule {}
