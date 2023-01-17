import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";

import { ActionsModule } from "../../../../shared/ui/actions";
import { ButtonModule } from "../../../../shared/ui/button";
import { IconModule } from "../../../../shared/ui/icon";
import { ImageModule } from "../../../../shared/ui/image";
import { TableComponent } from "./layout/table.component";

@NgModule({
	declarations: [TableComponent],
	imports: [CommonModule, ActionsModule, ButtonModule, TippyDirective, IconModule, ImageModule],
	exports: [TableComponent]
})
export class TableModule {}
