import type { TableEntity } from "@graphql";

export interface IOrder {
	code: TableEntity["code"];
	table?: {
		id: TableEntity["id"];
		name: TableEntity["name"];
	} | null;
}
