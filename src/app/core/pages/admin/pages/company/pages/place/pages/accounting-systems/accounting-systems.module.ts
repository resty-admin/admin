import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { AccountingSystemsRoutingModule } from "./accounting-systems-routing.module";
import { ACCONTING_SYSTEMS_COMPONENTS } from "./components";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";

@NgModule({
	declarations: [AccountingSystemsComponent, ...ACCONTING_SYSTEMS_COMPONENTS],
	imports: [
		CommonModule,
		AccountingSystemsRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule
	],
	exports: [AccountingSystemsComponent]
})
export class AccountingSystemsModule {}
