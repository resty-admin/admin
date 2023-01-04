import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { DatepickerModule } from "../../../../../../../../../shared/ui/datepicker";
import { OrdersComponent } from "./layout/orders.component";
import { OrderRoutingModule } from "./orders-routing.module";

@NgModule({
	declarations: [OrdersComponent],
	imports: [
		CommonModule,
		OrderRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		DatepickerModule,
		RadioButtonModule,
		IconModule,
		I18nModule
	]
})
export class OrdersModule {}
