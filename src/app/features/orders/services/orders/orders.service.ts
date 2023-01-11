import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateOrderGQL, DeleteOrderGQL, UpdateOrderGQL } from "../../graphql/orders";
import { OrderDialogComponent } from "../../ui/order-dialog/layout/order-dialog.component";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (order?: any) => this.openUpdateOrderDialog(order).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (order?: any) => {
				if (!order) {
					return;
				}

				this.openDeleteOrderDialog(order).subscribe();
			}
		}
	];

	constructor(
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _dialogService: DialogService
	) {}

	openCreateOrderDialog() {
		return this._dialogService.open(OrderDialogComponent).afterClosed$.pipe(
			take(1),
			filter((order) => Boolean(order)),
			switchMap((order: any) => this.createOrder(order))
		);
	}

	openUpdateOrderDialog(data?: any) {
		return this._dialogService.open(OrderDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((activeOrder) => Boolean(activeOrder)),
			switchMap((order: any) => this.updateOrder(order))
		);
	}

	openDeleteOrderDialog(order: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить заказ?",
				value: order
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((order) => Boolean(order)),
			switchMap((order) => this.deleteOrder(order.id))
		);
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
}
