import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RadioButtonComponent } from "./layout/radio-button.component";

@NgModule({
	declarations: [RadioButtonComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [RadioButtonComponent]
})
export class RadioButtonModule {}
