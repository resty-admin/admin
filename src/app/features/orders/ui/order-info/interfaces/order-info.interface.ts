import type { ActiveOrderEntity, HallEntity, TableEntity } from "@graphql";

export interface IOrderInfo {
	table?: {
		id: TableEntity["id"];
		name: TableEntity["name"];
		hall: {
			id: HallEntity["id"];
			name: HallEntity["name"];
		};
	} | null;
	startDate?: ActiveOrderEntity["startDate"];
	status: ActiveOrderEntity["status"];
}
