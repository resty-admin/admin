import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypographyModule } from "src/app/shared/ui/typography";

import { OrderInfoModule } from "../../../../../../../../../features/orders/ui";
import { ProductToOrderSelectModule } from "../../../../../../../../../features/products/ui";
import { ProductToOrderModule } from "../../../../../../../../../features/products/ui/product-to-order";
import { PreviewTableModule } from "../../../../../../../../../features/tables/ui";
import { UsersSelectModule } from "../../../../../../../../../features/users/ui/users-select/users-select.module";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../../../../../../shared/ui/button";
import { IconModule } from "../../../../../../../../../shared/ui/icon";
import { ImageModule } from "../../../../../../../../../shared/ui/image";
import { OrderComponent } from "./layout/order.component";
import { OrderRoutingModule } from "./order-routing.module";
import { ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [OrderComponent],
	imports: [
		CommonModule,
		OrderRoutingModule,
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
		UsersSelectModule
	],
	providers: ORDER_PROVIDERS
})
export class OrderModule {}
