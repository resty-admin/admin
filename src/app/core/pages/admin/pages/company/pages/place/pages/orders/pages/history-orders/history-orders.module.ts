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
import { HistoryOrdersRoutingModule } from "./history-orders-routing.module";
import { HistoryOrdersComponent } from "./layout/history-orders.component";
import { HISTORY_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HistoryOrdersComponent],
	imports: [
		CommonModule,
		HistoryOrdersRoutingModule,
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
	providers: HISTORY_ORDERS_PROVIDERS
})
export class HistoryOrdersModule {}
