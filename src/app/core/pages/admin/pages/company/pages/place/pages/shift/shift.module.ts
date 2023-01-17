import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { HallsSelectModule } from "../../../../../../../../../features/halls";
import { SelectedTablesModule, TablesSelectModule } from "../../../../../../../../../features/tables";
import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { ShiftComponent } from "./layout/shift.component";
import { SHIFT_PROVIDERS } from "./providers";
import { ShiftRoutingModule } from "./shift-routing.module";

@NgModule({
	declarations: [ShiftComponent],
	imports: [
		CommonModule,
		ShiftRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		ImageModule,
		IconModule,
		I18nModule,
		SelectedTablesModule,
		TablesSelectModule,
		HallsSelectModule
	],
	providers: SHIFT_PROVIDERS
})
export class ShiftModule {}
