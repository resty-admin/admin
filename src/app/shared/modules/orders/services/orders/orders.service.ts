import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { IHall } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { ORDERS_ENDPOINTS } from "../../../../endpoints";
import { ORDER_QUERY, ORDERS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly ordersQuery = this._apolloService.watchQuery<any>({
		query: ORDERS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly orders$ = this.ordersQuery.valueChanges.pipe(map(({ data }) => data.orders.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchOrders() {
		await this.ordersQuery.refetch();
	}

	getOrder(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: ORDER_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.order));
	}

	createOrder(hall: Partial<IHall>) {
		return this._apiService.post<IHall>(ORDERS_ENDPOINTS.CREATE_ORDER, hall);
	}

	updateOrder(id: string, hall: Partial<IHall>) {
		return this._apiService.patch<IHall>(ORDERS_ENDPOINTS.UPDATE_ORDER.replace(DYNAMIC_ID, id), hall);
	}

	deleteOrder(id: string) {
		return this._apiService.delete(ORDERS_ENDPOINTS.DELETE_ORDER.replace(DYNAMIC_ID, id));
	}
}
