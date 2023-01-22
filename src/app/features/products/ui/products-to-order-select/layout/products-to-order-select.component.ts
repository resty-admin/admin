import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { PRODUCTS_TO_ORDER_SELECT_I18N } from "@features/products/ui/products-to-order-select/constants";
import type { ISimpleChanges } from "@shared/interfaces";

import type {
	IProductToOrderToSelect,
	IProductToOrderWithSelected,
	IProductToOrderWithSelectedByStatus
} from "../interfaces";

@Component({
	selector: "app-products-to-order-select",
	templateUrl: "./products-to-order-select.component.html",
	styleUrls: ["./products-to-order-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsToOrderSelectComponent implements OnChanges {
	readonly productsToOrderSelectI18n = PRODUCTS_TO_ORDER_SELECT_I18N;
	@Output() selectedProductsToOrdersChange = new EventEmitter<string[]>();
	@Input() selectedProductsToOrders?: string[] | null;
	@Input() productsToOrders?: IProductToOrderToSelect[] | null;

	productsToOrdersWithSelected: IProductToOrderWithSelected[] = [];

	productsToOrdersWithSelectedByStatus: IProductToOrderWithSelectedByStatus[] = [];

	constructor(private readonly _formBuilder: FormBuilder) {}

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

	trackByFn(index: number) {
		return index;
	}

	emitChange() {
		this.selectedProductsToOrdersChange.emit(
			this.productsToOrdersWithSelected
				.filter((productToOrder) => productToOrder.selected)
				.map((productToOrder) => productToOrder.id)
		);
	}
}
