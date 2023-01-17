import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ImageModule } from "../../../../shared/ui/image";
import { TablesSelectComponent } from "./layout/tables-select.component";

@NgModule({
	declarations: [TablesSelectComponent],
	imports: [CommonModule, ImageModule, ReactiveFormsModule],
	exports: [TablesSelectComponent]
})
export class TablesSelectModule {}
