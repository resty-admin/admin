import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";

import { ProductToOrderModule } from "../product-to-order";
import { ProductsToOrderSelectComponent } from "./layout/products-to-order-select.component";
import { PRODUCT_TO_ORDER_SELECT_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsToOrderSelectComponent],
	imports: [CommonModule, ProductToOrderModule, FormsModule, I18nModule],
	providers: PRODUCT_TO_ORDER_SELECT_PROVIDERS,
	exports: [ProductsToOrderSelectComponent]
})
export class ProductToOrderSelectModule {}
