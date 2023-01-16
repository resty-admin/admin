import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { map } from "rxjs";

import { ORDER_ID } from "../../../../../../../../../../shared/constants";
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
export class OrderComponent implements OnInit {
	readonly orderPageI18n = ORDER_PAGE_I18N;

	private readonly _orderPageQuery = this._orderPageGQL.watch();

	readonly order$ = this._orderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(private readonly _orderPageGQL: OrderPageGQL, private readonly _routerService: RouterService) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		await this._orderPageQuery.setVariables({ orderId });
	}
}
