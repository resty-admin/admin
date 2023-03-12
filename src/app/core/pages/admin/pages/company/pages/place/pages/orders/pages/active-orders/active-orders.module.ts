import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrderModule, OrderSkeletonModule } from "@features/orders";
import { OrderDialogModule } from "@features/orders/ui/order-dialog/order-dialog.module";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddButtonModule } from "@shared/ui/add-button";
import { ButtonModule } from "@shared/ui/button";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { PagerModule } from "@shared/ui/pager";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsSkeletonModule } from "@shared/ui/tabs-skeleton";
import { TooltipModule } from "@shared/ui/tooltip";

import { ActiveOrdersRoutingModule } from "./active-orders-routing.module";
import { ACTIVE_ORDERS_COMPONENTS } from "./components";
import { ActiveOrdersComponent } from "./layout/active-orders.component";

@NgModule({
	declarations: [ActiveOrdersComponent, ...ACTIVE_ORDERS_COMPONENTS],
	imports: [
		CommonModule,
		ActiveOrdersRoutingModule,
		InputModule,
		IconModule,
		ImageModule,
		ButtonModule,
		ActionsModule,
		TooltipModule,
		I18nModule,
		FiltersModule,
		OrderDialogModule,
		DirectivesModule,
		SkeletonModule,
		TabsSkeletonModule,
		FiltersSkeletonModule,
		OrderModule,
		ListSkeletonModule,
		OrderSkeletonModule,
		ListModule,
		AddButtonModule,
		PagerModule
	]
})
export class ActiveOrdersModule {}
