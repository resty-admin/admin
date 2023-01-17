import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { lastValueFrom, Subject, tap } from "rxjs";
import { ChangesEnum } from "src/app/shared/enums";

import type { ActiveOrderEntity, CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import {
	ApproveProductsInOrderGQL,
	ApproveTableInOrderGQL,
	CreateOrderGQL,
	DeleteOrderGQL,
	RejectProductsInOrderGQL,
	RejectTableInOrderGQL,
	SetPaidStatusForProductsInOrderGQL,
	UpdateOrderGQL
} from "../../graphql/orders";
import { OrdersRepository } from "../../repositories";
import { OrderDialogComponent } from "../../ui/order-dialog/layout/order-dialog.component";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly actions: IAction<ActiveOrderEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (order) => this.openUpdateOrderDialog(order)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (order) => this.openDeleteOrderDialog(order)
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	readonly activeOrderId$ = this._ordersRepository.activeOrderId$;

	constructor(
		private readonly _ordersRepository: OrdersRepository,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _dialogService: DialogService,
		private readonly _approveProductsInOrderGQL: ApproveProductsInOrderGQL,
		private readonly _rejectProductsInOrderGQL: RejectProductsInOrderGQL,
		private readonly _approveTableInOrderGQL: ApproveTableInOrderGQL,
		private readonly _rejectTableInOrderGQL: RejectTableInOrderGQL,
		private readonly _setPaidStatusForProductsInOrderGQL: SetPaidStatusForProductsInOrderGQL
	) {}

	setActiveOrderId(orderId?: string) {
		return this._ordersRepository.setActiveOrderId(orderId);
	}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	async openCreateOrderDialog(data: AtLeast<CreateOrderInput, "place">) {
		const order: ActiveOrderEntity = await lastValueFrom(
			this._dialogService.open(OrderDialogComponent, { data }).afterClosed$
		);

		if (!order) {
			return;
		}

		await lastValueFrom(this.createOrder({ place: data.place, type: order.type }));
	}

	async openUpdateOrderDialog(data: AtLeast<ActiveOrderEntity, "id">) {
		const order: ActiveOrderEntity = await lastValueFrom(
			this._dialogService.open(OrderDialogComponent, { data }).afterClosed$
		);

		if (!order) {
			return;
		}

		await lastValueFrom(this.updateOrder({ id: order.id, type: order.type }));
	}

	async openDeleteOrderDialog(value: AtLeast<ActiveOrderEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить заказ?", value } };

		const order = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!order) {
			return;
		}

		await lastValueFrom(this.deleteOrder(order.id));
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
