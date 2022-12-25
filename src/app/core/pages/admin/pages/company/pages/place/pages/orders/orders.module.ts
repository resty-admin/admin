import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TypographyModule } from "src/app/shared/ui/typography";

import { DatepickerModule } from "../../../../../../../../../shared/ui/datepicker";
import { ORDERS_COMPONENTS } from "./components";
import { OrdersComponent } from "./layout/orders.component";
import { OrderRoutingModule } from "./orders-routing.module";

@NgModule({
	declarations: [OrdersComponent, ...ORDERS_COMPONENTS],
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
		IconModule
	],
	exports: [OrdersComponent]
})
export class OrdersModule {}
