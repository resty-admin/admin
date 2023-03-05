import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderInfoModule, OrderInfoSkeletonModule } from "@features/orders/ui";
import { ProductsToOrderSelectModule, ProductsToOrderSelectSkeletonModule } from "@features/products/ui";
import { ProductToOrderModule } from "@features/products/ui/product-to-order";
import { PreviewTableModule } from "@features/tables/ui";
import { UsersSelectSkeletonModule } from "@features/users";
import { UsersSelectModule } from "@features/users/ui/users-select/users-select.module";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderModule } from "../active-order/active-order.module";
import { HISTORY_ORDER_COMPONENTS } from "./components";
import { HistoryOrderRoutingModule } from "./history-order-routing.module";
import { HistoryOrderComponent } from "./layout/history-order.component";

@NgModule({
	declarations: [HistoryOrderComponent, ...HISTORY_ORDER_COMPONENTS],
	imports: [
		CommonModule,
		HistoryOrderRoutingModule,
		TypographyModule,
		ProductToOrderModule,
		I18nModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule,
		ProductsToOrderSelectModule,
		PreviewTableModule,
		ButtonModule,
		OrderInfoModule,
		UsersSelectModule,
		OrderInfoSkeletonModule,
		SkeletonModule,
		UsersSelectSkeletonModule,
		ProductsToOrderSelectSkeletonModule,
		ActiveOrderModule,
		DatatableModule
	]
})
export class HistoryOrderModule {}
