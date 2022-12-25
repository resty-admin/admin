import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { TABLES_COMPONENTS } from "./components";
import { TablesComponent } from "./layout/tables.component";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent, ...TABLES_COMPONENTS],
	imports: [
		CommonModule,
		TablesRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		FileModule,
		IconModule,
		ImageModule,
		ActionsModule,
		TooltipModule
	],
	exports: [TablesComponent]
})
export class TablesModule {}
