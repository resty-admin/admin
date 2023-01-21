import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrderDialogModule } from "@features/orders/ui/order-dialog/order-dialog.module";
import { DirectivesModule } from "@shared/modules/directives";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { TooltipModule } from "@shared/ui/tooltip";

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
		OrderDialogModule,
		DirectivesModule
	],
	providers: ACTIVE_ORDERS_PROVIDERS
})
export class ActiveOrdersModule {}
