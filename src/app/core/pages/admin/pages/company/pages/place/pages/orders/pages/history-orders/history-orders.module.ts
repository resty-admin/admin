import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrderDialogModule } from "@features/orders/ui/order-dialog/order-dialog.module";
import { I18nModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { DatatableSkeletonModule } from "@shared/ui/datatable-skeleton";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsSkeletonModule } from "@shared/ui/tabs-skeleton";
import { TooltipModule } from "@shared/ui/tooltip";

import { HISTORY_ORDERS_COMPONENTS } from "./components";
import { HistoryOrdersRoutingModule } from "./history-orders-routing.module";
import { HistoryOrdersComponent } from "./layout/history-orders.component";

@NgModule({
	declarations: [HistoryOrdersComponent, ...HISTORY_ORDERS_COMPONENTS],
	imports: [
		CommonModule,
		HistoryOrdersRoutingModule,
		InputModule,
		IconModule,
		DatatableModule,
		TooltipModule,
		ButtonModule,
		ActionsModule,
		I18nModule,
		FiltersModule,
		OrderDialogModule,
		SkeletonModule,
		TabsSkeletonModule,
		FiltersSkeletonModule,
		ListSkeletonModule,
		DatatableSkeletonModule
	]
})
export class HistoryOrdersModule {}
