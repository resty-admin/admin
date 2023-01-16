import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductToOrderModule } from "../../../../../../../../../features/products/ui/product-to-order";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { IconModule } from "../../../../../../../../../shared/ui/icon";
import { ImageModule } from "../../../../../../../../../shared/ui/image";
import { ORDER_COMPONENTS } from "./components";
import { OrderComponent } from "./layout/order.component";
import { OrderRoutingModule } from "./order-routing.module";
import { ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [OrderComponent, ...ORDER_COMPONENTS],
	imports: [
		CommonModule,
		OrderRoutingModule,
		TypographyModule,
		ProductToOrderModule,
		TranslocoModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule
	],
	providers: ORDER_PROVIDERS
})
export class OrderModule {}
