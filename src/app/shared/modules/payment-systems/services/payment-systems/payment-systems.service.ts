import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { IPaymentSystem } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { PAYMENT_SYSTEMS_ENDPOINTS } from "../../../../endpoints";
import { PAYMENT_SYSTEM_QUERY, PAYMENT_SYSTEMS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentSystemsService {
	readonly paymentSystemsQuery = this._apolloService.watchQuery<any>({
		query: PAYMENT_SYSTEMS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly paymentSystems$ = this.paymentSystemsQuery.valueChanges.pipe(map(({ data }) => data.payments.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchPaymentSystems() {
		await this.paymentSystemsQuery.refetch();
	}

	getPaymentSystem(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: PAYMENT_SYSTEM_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.payment.data));
	}

	createPaymentSystem(paymentSystem: Partial<IPaymentSystem>) {
		return this._apiService.post<IPaymentSystem>(PAYMENT_SYSTEMS_ENDPOINTS.CREATE_PAYMENT_SYSTEM, paymentSystem);
	}

	updatePaymentSystem(id: string, paymentSystem: Partial<IPaymentSystem>) {
		return this._apiService.patch<IPaymentSystem>(
			PAYMENT_SYSTEMS_ENDPOINTS.UPDATE_PAYMENT_SYSTEM.replace(DYNAMIC_ID, id),
			paymentSystem
		);
	}

	deletePaymentSystem(id: string) {
		return this._apiService.delete(PAYMENT_SYSTEMS_ENDPOINTS.DELETE_PAYMENT_SYSTEM.replace(DYNAMIC_ID, id));
	}
}
