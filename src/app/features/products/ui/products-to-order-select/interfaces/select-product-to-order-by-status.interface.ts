import type { ISelectProductToOrder } from "./select-product-to-order.interface";

export interface ISelectProductToOrderByStatus {
	status: string;
	productsToOrders: ISelectProductToOrder[];
}
