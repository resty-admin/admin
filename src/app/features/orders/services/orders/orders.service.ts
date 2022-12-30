import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IOrder } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { OrderDialogComponent } from "../../components";
import { CreateOrderGQL, DeleteOrderGQL, OrdersGQL, UpdateOrderGQL } from "../../graphql/orders";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly actions: IAction<IOrder>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (order?: IOrder) => this.openCreateOrUpdateOrderDialog(order)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (order?: IOrder) => {
				if (!order) {
					return;
				}

				this.openDeleteOrderDialog(order);
			}
		}
	];

	readonly orders$ = this._ordersGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.orders.data));

	constructor(
		private readonly _ordersGQL: OrdersGQL,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._ordersGQL.watch({ skip: 0, take: 5 }).refetch();
	}

	openCreateOrUpdateOrderDialog(data?: any) {
		return this._dialogService
			.openFormDialog(OrderDialogComponent, { data })
			.pipe(switchMap((order: any) => (order.id ? this.updateOrder(order) : this.createOrder(order))));
	}

	openDeleteOrderDialog(order: IOrder) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить заказ?",
					value: order
				}
			})
			.pipe(switchMap((order) => this.deleteOrder(order.id)));
	}

	createOrder(order: CreateOrderInput) {
		return this._createOrderGQL.mutate({ order }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateOrder(order: UpdateOrderInput) {
		return this._updateOrderGQL.mutate({ order }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteOrder(orderId: string) {
		return this._deleteOrderGQL.mutate({ orderId }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
