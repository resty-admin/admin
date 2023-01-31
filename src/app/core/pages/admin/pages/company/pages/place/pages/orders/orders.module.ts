import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderDialogModule } from "@features/orders/ui/order-dialog/order-dialog.module";
import { I18nModule } from "@shared/modules/i18n";
import { AddHeaderModule } from "@shared/ui/add-header";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { DatepickerModule } from "@shared/ui/datepicker";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { TabsModule } from "@shared/ui/tabs";
import { TypographyModule } from "@shared/ui/typography";

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
		I18nModule,
		TabsModule,
		AddHeaderModule,
		OrderDialogModule
	]
})
export class OrdersModule {}
