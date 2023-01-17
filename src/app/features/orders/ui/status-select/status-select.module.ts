import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { StatusSelectComponent } from "./layout/status-select.component";

@NgModule({
	declarations: [StatusSelectComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [StatusSelectComponent]
})
export class StatusSelectModule {}
