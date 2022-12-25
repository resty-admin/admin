import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DatepickerComponent } from "./layout/datepicker.component";

@NgModule({
	declarations: [DatepickerComponent],
	imports: [CommonModule],
	exports: [DatepickerComponent]
})
export class DatepickerModule {}
