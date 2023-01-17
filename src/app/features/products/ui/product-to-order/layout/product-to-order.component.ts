import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ProductToOrderPaidStatusEnum } from "../../../../../../graphql";

@Component({
	selector: "app-product-to-order",
	templateUrl: "./product-to-order.component.html",
	styleUrls: ["./product-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderComponent {
	@Input() productToOrder?: any;
	@Input() isActive = false;

	readonly productToOrderPaidStatus = ProductToOrderPaidStatusEnum;
}
