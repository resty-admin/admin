import type { ActiveOrderEntity } from "@graphql";

export interface IOrderForm {
	code: ActiveOrderEntity["code"];
	type: ActiveOrderEntity["type"];
}
