import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ToggleComponent } from "./layout/toggle.component";

@NgModule({
	declarations: [ToggleComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [ToggleComponent]
})
export class ToggleModule {}
