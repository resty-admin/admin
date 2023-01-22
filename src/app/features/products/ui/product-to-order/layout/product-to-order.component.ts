import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PRODUCT_TO_ORDER_I18N } from "@features/products/ui/product-to-order/constants";
import { ProductToOrderPaidStatusEnum } from "@graphql";

import { IProductToOrder } from "../interfaces";

@Component({
	selector: "app-product-to-order",
	templateUrl: "./product-to-order.component.html",
	styleUrls: ["./product-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderComponent {
	readonly productToOrderI18n = PRODUCT_TO_ORDER_I18N;
	@Input() productToOrder?: IProductToOrder;
	@Input() isActive = false;

	readonly productToOrderPaidStatus = ProductToOrderPaidStatusEnum;
}
