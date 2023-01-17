import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { HallsSelectComponent } from "./layout/halls-select.component";

@NgModule({
	declarations: [HallsSelectComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [HallsSelectComponent]
})
export class HallsSelectModule {}
