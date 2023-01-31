import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HallsSelectModule, HallsSelectSkeletonModule } from "@features/halls";
import {
	SelectedTablesModule,
	SelectedTablesSkeletonModule,
	TablesSelectModule,
	TablesSelectSkeletonModule
} from "@features/tables";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { SHIFT_COMPONENTS } from "./components";
import { ShiftComponent } from "./layout/shift.component";
import { SHIFT_PROVIDERS } from "./providers";
import { ShiftRoutingModule } from "./shift-routing.module";

@NgModule({
	declarations: [ShiftComponent, ...SHIFT_COMPONENTS],
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
		HallsSelectModule,
		SkeletonModule,
		HallsSelectSkeletonModule,
		TablesSelectSkeletonModule,
		SelectedTablesSkeletonModule
	],
	providers: SHIFT_PROVIDERS
})
export class ShiftModule {}
