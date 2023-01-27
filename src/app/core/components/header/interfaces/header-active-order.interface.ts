import type { ActiveOrderEntity } from "@graphql";

export interface IHeaderActiveOrder {
	id: ActiveOrderEntity["id"];
	type: ActiveOrderEntity["type"];
	code: ActiveOrderEntity["code"];
}
