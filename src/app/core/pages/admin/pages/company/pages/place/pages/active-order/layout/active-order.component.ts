import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { ActiveOrderEntity } from "@graphql";
import { ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import { ORDERS_EVENTS } from "@shared/enums";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SocketIoService } from "@shared/modules/socket-io";
import { lastValueFrom, map, take } from "rxjs";

import { ACTIVE_ORDER_PAGE } from "../constants";
import { ActiveOrderPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly activeOrderPage = ACTIVE_ORDER_PAGE;
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly order$ = this._activatedRoute.data.pipe(map((result) => result["order"]));

	selectedUsers: string[] = [];
	selectedProductsToOrders: string[] = [];
	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _socketIoService: SocketIoService
	) {}

	async ngOnInit() {
		const { companyId, placeId, orderId } = this._routerService.getParams();

		if (!orderId) {
			return;
		}

		this._ordersService.setActiveOrderId(orderId);

		this._socketIoService
			.fromEvents<{ order: ActiveOrderEntity }>(Object.values(ORDERS_EVENTS))
			.pipe(untilDestroyed(this))
			.subscribe(async (data) => {
				if (!data || !data.order || !orderId || orderId !== data.order.id) {
					return;
				}

				await this._activeOrderPageQuery.refetch();
			});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.ORDERS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		});

		this._actionsService.setAction({
			label: "Подтвердить оплату",
			func: async () => {
				await lastValueFrom(this._ordersService.setPaidStatusForProductsInOrder(this.selectedProductsToOrders));
			}
		});

		await this._activeOrderPageQuery.setVariables({ orderId });
	}

	async setSelectedUsers(usersIds: string[]) {
		const { productsToOrders } = await lastValueFrom(this.order$.pipe(take(1)));

		this.selectedProductsToOrders = (productsToOrders || [])
			.filter((productToOrder: any) => usersIds.includes(productToOrder.user.id))
			.map((productToOrder: any) => productToOrder.id);
	}

	async setSelectedProductsToOrders(productsToOrdersIds: string[]) {
		const { productsToOrders, users } = await lastValueFrom(this.order$.pipe(take(1)));

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
	}

	async approveTableInOrder() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await lastValueFrom(this._ordersService.approveTableInOrder(orderId));
	}

	async rejectTableInOrder() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await lastValueFrom(this._ordersService.rejectTableInOrder(orderId));
	}

	async approveProductsInOrder() {
		await lastValueFrom(this._ordersService.approveProductsInOrder(this.selectedProductsToOrders));
	}

	async rejectProductsInOrder() {
		await lastValueFrom(this._ordersService.rejectProductsInOrder(this.selectedProductsToOrders));
	}

	async cancelOrder(orderId: string) {
		await lastValueFrom(this._ordersService.cancelOrder(orderId));

		const companyId = this._routerService.getParams(COMPANY_ID.slice(1));
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId || !companyId) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.ACTIVE_ORDERS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
