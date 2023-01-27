import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-product-to-order-skeleton",
	templateUrl: "./product-to-order-skeleton.component.html",
	styleUrls: ["./product-to-order-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderSkeletonComponent {}
