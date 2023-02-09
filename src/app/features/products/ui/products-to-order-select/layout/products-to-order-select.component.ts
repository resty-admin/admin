import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import type { IProductToOrderToSelectInput } from "../interfaces";

export type IProductToOrderWithSelected = IProductToOrderToSelectInput & { selected: boolean };
export interface IProductToOrderWithSelectedByStatus {
	status: any;
	productsToOrders: IProductToOrderWithSelected[];
}
@Component({
	selector: "app-products-to-order-select",
	templateUrl: "./products-to-order-select.component.html",
	styleUrls: ["./products-to-order-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsToOrderSelectComponent implements OnChanges {
	@Output() selectedProductsToOrdersChange = new EventEmitter<{ id: string }[]>();
	@Input() selectedProductsToOrders?: { id: string }[] | null;

	@Input() productsToOrders?: IProductToOrderToSelectInput[] | null;

	productsToOrdersWithSelected: IProductToOrderWithSelected[] = [];

	productsToOrdersWithSelectedByStatus: IProductToOrderWithSelectedByStatus[] = [];

	constructor(readonly sharedService: SharedService) {}

	ngOnChanges(changes: ISimpleChanges<ProductsToOrderSelectComponent>) {
		if (!(changes.productsToOrders?.currentValue || changes.selectedProductsToOrders?.currentValue)) {
			return;
		}

		this.productsToOrdersWithSelected = (this.productsToOrders || []).map((productToOrder) => ({
			...productToOrder,
			selected: (this.selectedProductsToOrders || []).map(({ id }) => id).includes(productToOrder.id)
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
			this.productsToOrdersWithSelected.filter((productToOrder) => productToOrder.selected)
		);
	}
}
