import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { firstValueFrom, map, startWith, switchMap, take } from "rxjs";

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
	readonly statusControl = new FormControl<any>(ProductToOrderStatusEnum.Approved);
	private readonly _orderPageQuery = this._orderPageGQL.watch();
	readonly order$ = this._orderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	readonly table$ = this.order$.pipe(map((order) => ({ ...order.table, tableStatus: order.tableStatus } as any)));

	readonly productsToOrders$ = this.order$.pipe(
		switchMap((order) =>
			this.statusControl.valueChanges.pipe(
				startWith(this.statusControl.value),
				map((status) => (order.productsToOrders || []).filter((usersToOrder) => usersToOrder.status === status))
			)
		)
	);

	constructor(
		private readonly _orderPageGQL: OrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	approveTableInOrder() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		this._ordersService.approveTableInOrder(orderId).pipe(take(1)).subscribe();
	}

	rejectTableInOrder() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		this._ordersService.rejectTableInOrder(orderId).pipe(take(1)).subscribe();
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

		this.statusControl.valueChanges.pipe(untilDestroyed(this)).subscribe((status) => {
			if (status === ProductToOrderStatusEnum.Approved) {
				this._actionsService.setAction({
					label: "Подтвердить оплату",
					func: async () => {
						const productsToApprove = Object.entries(this.productsControl.value as any)
							.filter(([_, value]) => value)
							.map(([key]) => key);

						try {
							await firstValueFrom(this._ordersService.setPaidStatusForProductsInOrder(productsToApprove));

							await this._orderPageQuery.refetch();
						} catch (error) {
							console.error(error);
						}
					}
				});
			} else {
				this._actionsService.setAction({
					label: "Подтвердить блюда",
					func: async () => {
						const productsToApprove = Object.entries(this.productsControl.value as any)
							.filter(([_, value]) => value)
							.map(([key]) => key);

						try {
							await firstValueFrom(this._ordersService.approveProductsInOrder(productsToApprove));

							await this._orderPageQuery.refetch();
						} catch (error) {
							console.error(error);
						}
					}
				});
			}
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.ORDERS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		});

		await this._orderPageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
