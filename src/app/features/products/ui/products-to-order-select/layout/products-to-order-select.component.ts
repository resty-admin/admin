import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import { PRODUCTS_TO_ORDER_SELECT } from "../constants";
import type { IProductToOrderToSelectInput } from "../interfaces";
import { PRODUCTS_TO_ORDER_SELECT_PROVIDERS } from "../providers";

export type IProductToOrderWithSelected = IProductToOrderToSelectInput & { selected: boolean };
export interface IProductToOrderWithSelectedByStatus {
	status: any;
	productsToOrders: IProductToOrderWithSelected[];
}
@Component({
	selector: "app-products-to-order-select",
	templateUrl: "./products-to-order-select.component.html",
	styleUrls: ["./products-to-order-select.component.scss"],
	providers: PRODUCTS_TO_ORDER_SELECT_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsToOrderSelectComponent implements OnChanges {
	@Output() selectedProductsToOrdersChange = new EventEmitter<string[]>();
	@Input() selectedProductsToOrders?: string[] | null;
	@Input() productsToOrders?: IProductToOrderToSelectInput[] | null;

	readonly productsToOrderSelect = PRODUCTS_TO_ORDER_SELECT;

	productsToOrdersWithSelected: IProductToOrderWithSelected[] = [];

	productsToOrdersWithSelectedByStatus: IProductToOrderWithSelectedByStatus[] = [];

	constructor(readonly sharedService: SharedService) {}

	ngOnChanges(changes: ISimpleChanges<ProductsToOrderSelectComponent>) {
		if (!(changes.productsToOrders?.currentValue || changes.selectedProductsToOrders?.currentValue)) {
			return;
		}

		this.productsToOrdersWithSelected = (this.productsToOrders || []).map((productToOrder) => ({
			...productToOrder,
			selected: (this.selectedProductsToOrders || []).includes(productToOrder.id)
		}));

		this.productsToOrdersWithSelectedByStatus = [];

		for (const productToOrder of this.productsToOrdersWithSelected) {
			const alreadyExist = this.productsToOrdersWithSelectedByStatus.find(
				(productToOrderByStatus) => productToOrderByStatus.status === productToOrder.status
			);

			if (alreadyExist) {
				alreadyExist.productsToOrders.push(productToOrder);
			} else {
				this.productsToOrdersWithSelectedByStatus.push({
					status: productToOrder.status,
					productsToOrders: [productToOrder]
				});
			}
		}
	}

	emitChange() {
		this.selectedProductsToOrdersChange.emit(
			this.productsToOrdersWithSelected
				.filter((productToOrder) => productToOrder.selected)
				.map((productToOrder) => productToOrder.id)
		);
	}
}
