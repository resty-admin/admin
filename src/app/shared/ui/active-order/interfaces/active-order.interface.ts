import type { ActiveOrderEntity } from "../../../../../graphql";

export interface IActiveOrder {
	code: ActiveOrderEntity["code"];
	type: ActiveOrderEntity["type"];
}
