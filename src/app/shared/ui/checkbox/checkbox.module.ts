import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "@shared/ui/icon";

import { CheckboxComponent } from "./layout/checkbox.component";

@NgModule({
	declarations: [CheckboxComponent],
	imports: [CommonModule, ReactiveFormsModule, IconModule],
	exports: [CheckboxComponent]
})
export class CheckboxModule {}
