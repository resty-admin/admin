import { Injectable } from "@angular/core";
import type { CreateOrderInput, UpdateOrderInput } from "@graphql";

import {
	ApproveOrderGQL,
	ApproveProductsInOrderGQL,
	CancelOrderGQL,
	CloseOrderGQL,
	CreateOrderGQL,
	DeleteOrderGQL,
	RejectOrderGQL,
	RejectProductsInOrderGQL,
	SetPaidStatusForProductsInOrderGQL,
	UpdateOrderGQL
} from "../../graphql";
import { OrdersRepository } from "../../repositories";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly activeOrderId$ = this._ordersRepository.activeOrderId$;

	constructor(
		private readonly _ordersRepository: OrdersRepository,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _closeOrderGQL: CloseOrderGQL,
		private readonly _cancelOrderGQL: CancelOrderGQL,
		private readonly _approveProductsInOrderGQL: ApproveProductsInOrderGQL,
		private readonly _rejectProductsInOrderGQL: RejectProductsInOrderGQL,
		private readonly _approveTableInOrderGQL: ApproveOrderGQL,
		private readonly _rejectTableInOrderGQL: RejectOrderGQL,
		private readonly _setPaidStatusForProductsInOrderGQL: SetPaidStatusForProductsInOrderGQL
	) {}

	setActiveOrderId(orderId?: string) {
		return this._ordersRepository.setActiveOrderId(orderId);
	}

	createOrder(order: CreateOrderInput) {
		return this._createOrderGQL.mutate({ order });
	}

	updateOrder(order: UpdateOrderInput) {
		return this._updateOrderGQL.mutate({ order });
	}

	deleteOrder(orderId: string) {
		return this._deleteOrderGQL.mutate({ orderId });
	}

	closeOrder(orderId: string) {
		return this._closeOrderGQL.mutate({ orderId });
	}

	cancelOrder(orderId: string) {
		return this._cancelOrderGQL.mutate({ orderId });
	}

	approveProductsInOrder(productToOrderIds: string[]) {
		return this._approveProductsInOrderGQL.mutate({ productToOrderIds });
	}

	rejectProductsInOrder(productToOrderIds: string[]) {
		return this._rejectProductsInOrderGQL.mutate({ productToOrderIds });
	}

	approveTableInOrder(orderId: string) {
		return this._approveTableInOrderGQL.mutate({ orderId });
	}

	rejectTableInOrder(orderId: string) {
		return this._rejectTableInOrderGQL.mutate({ orderId });
	}

	setPaidStatusForProductsInOrder(productToOrderIds: string[]) {
		return this._setPaidStatusForProductsInOrderGQL.mutate({ productToOrderIds });
	}
}
