import type { ActiveOrderEntity, TableEntity } from "@graphql";

export interface IOrder {
	code: TableEntity["code"];
	type: ActiveOrderEntity["type"];
	table?: {
		id: TableEntity["id"];
		name: TableEntity["name"];
		file: TableEntity["file"];
	} | null;
}
