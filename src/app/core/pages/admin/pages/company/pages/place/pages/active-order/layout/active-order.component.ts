import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { ProductToOrderStatusEnum } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map, switchMap, take } from "rxjs";

import { ActiveOrderPageGQL } from "../graphql";

@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly activeOrder$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	selectedUsers: string[] = [];
	selectedProductsToOrders: string[] = [];

	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await this._activeOrderPageQuery.setVariables({ orderId });

		this._ordersService.setActiveOrderId(orderId);

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.ORDERS.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
		});

		this._actionsService.setAction({
			label: "Подтвердить оплату",
			func: () => {
				this._ordersService.setPaidStatusForProductsInOrder(this.selectedProductsToOrders).pipe(take(1)).subscribe();
			}
		});
	}

	setSelectedUsers(usersIds: string[]) {
		this.activeOrder$.pipe(take(1)).subscribe((order) => {
			const { productsToOrders } = order!;

			this.selectedProductsToOrders = (productsToOrders || [])
				.filter((productToOrder: any) => usersIds.includes(productToOrder.user.id))
				.map((productToOrder: any) => productToOrder.id);
		});
	}

	setSelectedProductsToOrders(productsToOrdersIds: string[]) {
		this.activeOrder$.pipe(take(1)).subscribe((order) => {
			const { productsToOrders, users } = order!;

			const productsByUser = (users || []).reduce(
				(usersMap: any, user: any) => ({
					...usersMap,
					[user.id]: (productsToOrders || [])
						.filter((productToOrder: any) => productToOrder.user.id === user.id)
						.every((productToOrder: any) => productsToOrdersIds.includes(productToOrder.id))
				}),
				{}
			);

			this.selectedUsers = Object.entries(productsByUser)
				.filter(([_, value]) => value)
				.map(([key]) => key);
		});
	}

	approveTableInOrder() {
		this.activeOrder$
			.pipe(
				switchMap((order) => this._ordersService.approveTableInOrder(order!.id)),
				take(1)
			)
			.subscribe();
	}

	rejectTableInOrder() {
		this.activeOrder$
			.pipe(
				switchMap((order) => this._ordersService.rejectTableInOrder(order!.id)),
				take(1)
			)
			.subscribe();
	}

	approveProductsInOrder() {
		this._ordersService.approveProductsInOrder(this.selectedProductsToOrders).pipe(take(1)).subscribe();
	}

	rejectProductsInOrder() {
		this._ordersService.rejectProductsInOrder(this.selectedProductsToOrders).pipe(take(1)).subscribe();
	}

	cancelOrder(orderId: string) {
		this._ordersService
			.cancelOrder(orderId)
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.ACTIVE_ORDERS.absolutePath
						.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
						.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
				);
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
