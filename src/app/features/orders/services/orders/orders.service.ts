import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";
import { ChangesEnum } from "src/app/shared/enums";

import type { ActiveOrderEntity, CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateOrderGQL, DeleteOrderGQL, UpdateOrderGQL } from "../../graphql/orders";
import { OrderDialogComponent } from "../../ui/order-dialog/layout/order-dialog.component";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly actions: IAction<ActiveOrderEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (order) => this.openUpdateOrderDialog(order).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (order) => this.openDeleteOrderDialog(order).pipe(take(1)).subscribe()
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateOrderDialog(data: AtLeast<CreateOrderInput, "place">) {
		return this._dialogService.open(OrderDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((order) => Boolean(order)),
			switchMap((order: ActiveOrderEntity) => this.createOrder({ place: data.place, type: order.type }))
		);
	}

	openUpdateOrderDialog(data: AtLeast<ActiveOrderEntity, "id">) {
		return this._dialogService.open(OrderDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((activeOrder) => Boolean(activeOrder)),
			switchMap((order: ActiveOrderEntity) => this.updateOrder({ id: order.id, type: order.type }))
		);
	}

	openDeleteOrderDialog(value: AtLeast<ActiveOrderEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить заказ?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((order) => Boolean(order)),
			switchMap((order) => this.deleteOrder(order.id))
		);
	}

	createOrder(order: CreateOrderInput) {
		return this._createOrderGQL.mutate({ order }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateOrder(order: UpdateOrderInput) {
		return this._updateOrderGQL.mutate({ order }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteOrder(orderId: string) {
		return this._deleteOrderGQL.mutate({ orderId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}