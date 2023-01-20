import type { IProductToOrderWithSelected } from "./product-to-with-selected.interface";

export interface IProductToOrderWithSelectedByStatus {
	status: string;
	productsToOrders: IProductToOrderWithSelected[];
}
