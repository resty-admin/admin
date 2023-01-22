import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";

import { ProductToOrderComponent } from "./layout/product-to-order.component";
import { PRODUCT_TO_ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductToOrderComponent],
	imports: [CommonModule, ImageModule, IconModule, I18nModule],
	providers: PRODUCT_TO_ORDER_PROVIDERS,
	exports: [ProductToOrderComponent]
})
export class ProductToOrderModule {}
