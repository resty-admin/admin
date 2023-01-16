import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductToOrderModule } from "../../../../../../../../../features/products/ui/product-to-order";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { OrderComponent } from "./layout/order.component";
import { OrderRoutingModule } from "./order-routing.module";
import { ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [OrderComponent],
	imports: [CommonModule, OrderRoutingModule, TypographyModule, ProductToOrderModule, TranslocoModule],
	providers: ORDER_PROVIDERS
})
export class OrderModule {}
