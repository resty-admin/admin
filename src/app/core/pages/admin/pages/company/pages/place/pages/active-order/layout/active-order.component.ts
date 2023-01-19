import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map, take, tap } from "rxjs";

import { ProductToOrderStatusEnum } from "../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../features/app";
import { OrdersService } from "../../../../../../../../../../features/orders";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "../../../../../../../../../../shared/constants";
import { BreadcrumbsService } from "../../../../../../../../../../shared/modules/breadcrumbs";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { SocketIoService } from "../../../../../../../../../../shared/modules/socket-io";
import { ACTIVE_ORDER_PAGE_I18N } from "../constants";
import { ActiveOrderPageGQL } from "../graphql/active-order-page";

export enum ORDERS_EVENTS {
	CREATED = "ORDER_CREATED",
	CLOSED = "ORDER_CLOSED",
	CANCELED = "ORDER_CANCELED",
	CONFIRM = "ORDER_CONFIRM",
	REJECTED = "ORDER_REJECTED",
	APPROVED = "ORDER_APPROVED",
	WAITING_FOR_MANUAL_PAY = "ORDER_WAITING_FOR_MANUAL_PAY",
	USER_ADDED = "ORDER_USER_ADDED",
	TABLE_ADDED = "ORDER_TABLE_ADDED",
	TABLE_APPROVED = "ORDER_TABLE_APPROVED",
	TABLE_REJECTED = "ORDER_TABLE_REJECTED",
	TABLE_REMOVED = "ORDER_TABLE_REMOVED"
}

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly activeOrderPageI18n = ACTIVE_ORDER_PAGE_I18N;

	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	readonly productsControl = new FormControl();
	readonly usersControl = new FormControl<Record<string, boolean>>();
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly order$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _socketIoService: SocketIoService
	) {}

	async approveTableInOrder() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await lastValueFrom(this._ordersService.approveTableInOrder(orderId));
	}

	async rejectTableInOrder() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await lastValueFrom(this._ordersService.rejectTableInOrder(orderId));
	}

	async approveProductsInOrder() {
		const productsToOrdersIds = Object.entries(this.productsControl.value || {})
			.filter(([_, value]) => value)
			.map(([key]) => key);

		await lastValueFrom(this._ordersService.approveProductsInOrder(productsToOrdersIds));

		await this._activeOrderPageQuery.refetch();
	}

	async rejectProductsInOrder() {
		const productsToOrdersIds = Object.entries(this.productsControl.value || {})
			.filter(([_, value]) => value)
			.map(([key]) => key);

		await lastValueFrom(this._ordersService.rejectProductsInOrder(productsToOrdersIds));

		await this._activeOrderPageQuery.refetch();
	}

	async cancelOrder(orderId: string) {
		await lastValueFrom(this._ordersService.cancelOrder(orderId));

		await this._activeOrderPageQuery.refetch();
	}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const { companyId, placeId, orderId } = this._routerService.getParams();

		if (!orderId) {
			return;
		}

		this._ordersService.setActiveOrderId(orderId);

		this._socketIoService
			.fromEvents(Object.values(ORDERS_EVENTS))
			.pipe(untilDestroyed(this))
			.subscribe(async () => {
				await this._activeOrderPageQuery.refetch();
			});

		this.usersControl.valueChanges
			.pipe(
				untilDestroyed(this),
				tap(async (usersMap) => {
					const order = await lastValueFrom(this.order$.pipe(take(1)));
					const productsByUser = Object.keys(this.productsControl.value || {}).reduce((productsMap, id) => {
						const userId = (order.productsToOrders || []).find((productToOrder) => productToOrder.id === id)?.user.id;

						const users = Object.keys(usersMap);

						return {
							...productsMap,
							[id]: userId && (users || []).includes(userId)
						};
					}, {});

					this.productsControl.patchValue(productsByUser);
				})
			)
			.subscribe();

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.ORDERS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		});

		this._actionsService.setAction({
			label: "Подтвердить оплату",
			func: async () => {
				const productsToOrdersIds = Object.entries(this.productsControl.value || {})
					.filter(([_, value]) => value)
					.map(([key]) => key);

				await lastValueFrom(this._ordersService.setPaidStatusForProductsInOrder(productsToOrdersIds));

				await this._activeOrderPageQuery.refetch();
			}
		});

		await this._activeOrderPageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
