import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrdersEvents, ProductToOrderPaidStatusEnum, ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SocketIoService } from "@shared/modules/socket-io";
import { ToastrService } from "@shared/ui/toastr";
import { SelectionType } from "@swimlane/ngx-datatable";
import { filter, map, switchMap, take } from "rxjs";

import { ActiveOrderPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly SelectionType = SelectionType;
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly activeOrder$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	selectedUsers: string[] = [];
	selectedProductsToOrders: { id: string }[] = [];

	isPayActive = false;
	isActionsActive = false;

	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _socketIoService: SocketIoService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
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

		this.setAction();

		this._socketIoService
			.fromEvents(Object.values(OrdersEvents))
			.pipe(
				untilDestroyed(this),
				filter((order: any) => order.id === orderId),
				switchMap(() => this._activeOrderPageQuery.refetch())
			)
			.subscribe((result) => {
				const { productsToOrders } = result.data.order || {};

				this.setSelected(
					this.selectedProductsToOrders.map(({ id }) =>
						(productsToOrders || []).find((productToOrder) => productToOrder.id === id)
					)
				);
			});
	}

	setAction() {
		this._actionsService.setAction({
			label: "CONFIRM_PAYMENT",
			disabled: !this.isPayActive,
			func: () => this.setPaidStatusForProductsInOrder()
		});
	}

	setSelected(productsToOrders: any[]) {
		this.selectedProductsToOrders = productsToOrders;
		this.isActionsActive =
			productsToOrders.length > 0 &&
			productsToOrders.every((productToOrder) => productToOrder.status === ProductToOrderStatusEnum.WaitingForApprove);
		this.isPayActive =
			productsToOrders.length > 0 &&
			productsToOrders.every((productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Waiting);
		this.setAction();
	}

	setPaidStatusForProductsInOrder() {
		this._ordersService
			.setPaidStatusForProductsInOrder(this.selectedProductsToOrders.map(({ id }) => id))
			.pipe(take(1))
			.subscribe();
	}

	setSelectedUsers(usersIds: string[]) {
		this.activeOrder$.pipe(take(1)).subscribe((order) => {
			this.setSelected(
				(order!.productsToOrders || []).filter((productToOrder: any) => usersIds.includes(productToOrder.user.id))
			);
		});
	}

	setSelectedProductsToOrders(productsToOrdersIds: { id: string }[]) {
		this.activeOrder$.pipe(take(1)).subscribe((order) => {
			const { productsToOrders, users } = order!;

			const productsByUser = (users || []).reduce(
				(usersMap, user) => ({
					...usersMap,
					[user.id]: (productsToOrders || [])
						.filter((productToOrder: any) => productToOrder.user.id === user.id)
						.every((productToOrder: any) => productsToOrdersIds.map(({ id }) => id).includes(productToOrder.id))
				}),
				{}
			);

			this.selectedUsers = Object.entries(productsByUser)
				.filter(([_, value]) => value)
				.map(([key]) => key);

			this.setSelected(this.selectedProductsToOrders);
		});
	}

	approveTableInOrder() {
		this.activeOrder$
			.pipe(
				this._toastrService.observe(this._i18nService.translate("ACTIVE_ORDER.TABLE_APPROVE")),
				switchMap((order) => this._ordersService.approveTableInOrder(order!.id)),
				take(1)
			)
			.subscribe();
	}

	rejectTableInOrder() {
		this.activeOrder$
			.pipe(
				this._toastrService.observe(this._i18nService.translate("ACTIVE_ORDER.TABLE_REJECT")),
				switchMap((order) => this._ordersService.rejectTableInOrder(order!.id)),
				take(1)
			)
			.subscribe();
	}

	approveProductsInOrder() {
		this._ordersService
			.approveProductsInOrder(this.selectedProductsToOrders.map(({ id }) => id))
			.pipe(this._toastrService.observe(this._i18nService.translate("ACTIVE_ORDER.PRODUCTS_APPROVE")), take(1))
			.subscribe();
	}

	rejectProductsInOrder() {
		this._ordersService
			.rejectProductsInOrder(this.selectedProductsToOrders.map(({ id }) => id))
			.pipe(this._toastrService.observe(this._i18nService.translate("ACTIVE_ORDER.PRODUCTS_REJECT")), take(1))
			.subscribe();
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

	selectChange({ selected }: any) {
		this.setSelected(selected);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
