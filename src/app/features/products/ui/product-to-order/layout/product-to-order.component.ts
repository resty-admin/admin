import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ProductToOrderPaidStatusEnum } from "@graphql";

import { PRODUCT_TO_ORDER } from "../constants";
import { IProductToOrder } from "../interfaces";

@Component({
	selector: "app-product-to-order",
	templateUrl: "./product-to-order.component.html",
	styleUrls: ["./product-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderComponent {
	readonly productToOrderI18n = PRODUCT_TO_ORDER;
	@Input() productToOrder?: IProductToOrder;
	@Input() isActive = false;

	readonly productToOrderPaidStatus = ProductToOrderPaidStatusEnum;
}
