import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconModule } from "../../../../shared/ui/icon";
import { SelectedTablesComponent } from "./layout/selected-tables.component";

@NgModule({
	declarations: [SelectedTablesComponent],
	imports: [CommonModule, IconModule],
	exports: [SelectedTablesComponent]
})
export class SelectedTablesModule {}
