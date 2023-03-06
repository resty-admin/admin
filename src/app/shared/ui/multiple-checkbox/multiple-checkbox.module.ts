import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "@shared/ui/icon";

import { MultipleCheckboxComponent } from "./layout/multiple-checkbox.component";

@NgModule({
	declarations: [MultipleCheckboxComponent],
	imports: [CommonModule, ReactiveFormsModule, IconModule],
	exports: [MultipleCheckboxComponent]
})
export class MultipleCheckboxModule {}
