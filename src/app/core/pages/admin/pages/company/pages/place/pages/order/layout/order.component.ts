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
import { ORDER_PAGE_I18N } from "../constants/order-page-i18n.constant";
import { OrderPageGQL } from "../graphql/order-page";

@UntilDestroy()
@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit, OnDestroy {
	readonly orderPageI18n = ORDER_PAGE_I18N;

	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	readonly productsControl = new FormControl();
	readonly usersControl = new FormControl<string[]>();
	private readonly _orderPageQuery = this._orderPageGQL.watch();
	readonly order$ = this._orderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(
		private readonly _orderPageGQL: OrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
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

		await this._orderPageQuery.refetch();
	}

	async rejectProductsInOrder() {
		const productsToOrdersIds = Object.entries(this.productsControl.value || {})
			.filter(([_, value]) => value)
			.map(([key]) => key);

		await lastValueFrom(this._ordersService.rejectProductsInOrder(productsToOrdersIds));

		await this._orderPageQuery.refetch();
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

		this.usersControl.valueChanges
			.pipe(
				untilDestroyed(this),
				tap(async (users) => {
					const order = await lastValueFrom(this.order$.pipe(take(1)));
					const productsByUser = Object.keys(this.productsControl.value || {}).reduce((productsMap, id) => {
						const userId = (order.productsToOrders || []).find((productToOrder) => productToOrder.id === id)?.user.id;

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

				await this._orderPageQuery.refetch();
			}
		});

		await this._orderPageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
