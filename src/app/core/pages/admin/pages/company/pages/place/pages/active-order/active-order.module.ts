import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderInfoModule } from "@features/orders/ui";
import { ProductToOrderSelectModule } from "@features/products/ui";
import { ProductToOrderModule } from "@features/products/ui";
import { PreviewTableModule } from "@features/tables/ui";
import { UsersSelectModule } from "@features/users/ui";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderRoutingModule } from "./active-order-routing.module";
import { ACTIVE_ORDER_COMPONENTS } from "./components";
import { ActiveOrderComponent } from "./layout/active-order.component";
import { ACTIVE_ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ActiveOrderComponent, ...ACTIVE_ORDER_COMPONENTS],
	imports: [
		CommonModule,
		ActiveOrderRoutingModule,
		TypographyModule,
		ProductToOrderModule,
		TranslocoModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule,
		ProductToOrderSelectModule,
		PreviewTableModule,
		ButtonModule,
		OrderInfoModule,
		UsersSelectModule,
		TextareaModule
	],
	providers: ACTIVE_ORDER_PROVIDERS
})
export class ActiveOrderModule {}
