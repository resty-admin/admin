import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ProductToOrderStatusEnum } from "../../../../../../graphql";

@Component({
	selector: "app-product-to-order",
	templateUrl: "./product-to-order.component.html",
	styleUrls: ["./product-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderComponent {
	@Input() userToOrder?: any;
	@Input() isActive = false;

	readonly productToOrderStatus = ProductToOrderStatusEnum;
}
