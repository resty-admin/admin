import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";

import { ProductToOrderModule } from "../product-to-order";
import { ProductsToOrderSelectComponent } from "./layout/products-to-order-select.component";
import { PRODUCTS_TO_ORDER_SELECT_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsToOrderSelectComponent],
	imports: [CommonModule, FormsModule, ProductToOrderModule, I18nModule],
	providers: PRODUCTS_TO_ORDER_SELECT_PROVIDERS,
	exports: [ProductsToOrderSelectComponent]
})
export class ProductsToOrderSelectModule {}
