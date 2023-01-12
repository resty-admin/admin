import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";

import { OrderDialogModule } from "../../../../../../../../../../../features/orders/ui/order-dialog/order-dialog.module";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { ButtonModule } from "../../../../../../../../../../../shared/ui/button";
import { FiltersModule } from "../../../../../../../../../../../shared/ui/filters";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { AllOrdersRoutingModule } from "./all-orders-routing.module";
import { AllOrdersComponent } from "./layout/all-orders.component";
import { ALL_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AllOrdersComponent],
	imports: [
		CommonModule,
		AllOrdersRoutingModule,
		InputModule,
		IconModule,
		DatatableModule,
		TooltipModule,
		ButtonModule,
		ActionsModule,
		TranslocoModule,
		FiltersModule,
		OrderDialogModule
	],
	providers: ALL_ORDERS_PROVIDERS
})
export class AllOrdersModule {}
