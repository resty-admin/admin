import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";

import { OrderDialogModule } from "../../../../../../../../../../../features/orders/ui/order-dialog/order-dialog.module";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { ButtonModule } from "../../../../../../../../../../../shared/ui/button";
import { FiltersModule } from "../../../../../../../../../../../shared/ui/filters";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { ActiveOrdersRoutingModule } from "./active-orders-routing.module";
import { ActiveOrdersComponent } from "./layout/active-orders.component";
import { ACTIVE_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ActiveOrdersComponent],
	imports: [
		CommonModule,
		ActiveOrdersRoutingModule,
		InputModule,
		IconModule,
		ImageModule,
		ButtonModule,
		ActionsModule,
		TooltipModule,
		TranslocoModule,
		FiltersModule,
		OrderDialogModule
	],
	providers: ACTIVE_ORDERS_PROVIDERS
})
export class ActiveOrdersModule {}
