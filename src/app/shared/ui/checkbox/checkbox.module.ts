import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CheckboxComponent } from "./layout/checkbox.component";

@NgModule({
	declarations: [CheckboxComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [CheckboxComponent]
})
export class CheckboxModule {}
