import type { IProductToOrderToSelect } from "./product-to-order-to-select.interface";

export type IProductToOrderWithSelected = IProductToOrderToSelect & { selected: boolean };
