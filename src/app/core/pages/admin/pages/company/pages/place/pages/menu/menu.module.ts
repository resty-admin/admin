import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { DatepickerModule } from "src/app/shared/ui/datepicker";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { MultipleCheckboxModule } from "../../../../../../../../../shared/ui/multiple-checkbox";
import { MenuComponent } from "./layout/menu.component";
import { MenuRoutingModule } from "./menu-routing.module";

@NgModule({
	declarations: [MenuComponent],
	imports: [
		CommonModule,
		MenuRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		FileModule,
		RadioButtonModule,
		SelectModule,
		IconModule,
		DatepickerModule,
		MultipleCheckboxModule
	],
	exports: [MenuComponent]
})
export class MenuModule {}
