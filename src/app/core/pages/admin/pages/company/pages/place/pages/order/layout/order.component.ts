import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, startWith, switchMap } from "rxjs";

import { ProductToOrderStatusEnum } from "../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../features/app";
import { OrdersService } from "../../../../../../../../../../features/orders";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "../../../../../../../../../../shared/constants";
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

	readonly statuses = [ProductToOrderStatusEnum.Confirmed, ProductToOrderStatusEnum.RequestedToConfirm];

	readonly productsControl = new FormControl();
	readonly statusControl = new FormControl<any>(ProductToOrderStatusEnum.Confirmed);
	private readonly _orderPageQuery = this._orderPageGQL.watch();
	readonly productsToOrders$ = this._orderPageQuery.valueChanges.pipe(
		map((result) => result.data.order),
		switchMap((order) =>
			this.statusControl.valueChanges.pipe(
				startWith(ProductToOrderStatusEnum.Confirmed),
				map((status) => (order.usersToOrders || []).filter((usersToOrder) => usersToOrder.status === status))
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
			if (status === ProductToOrderStatusEnum.Confirmed) {
				this._actionsService.setAction({
					label: "Подтвердить оплату",
					func: () => {
						console.log(this.productsControl.getRawValue());
					}
				});
			} else {
				this._actionsService.setAction({
					label: "Подтвердить блюда",
					func: () => {
						console.log(this.productsControl.getRawValue());
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
