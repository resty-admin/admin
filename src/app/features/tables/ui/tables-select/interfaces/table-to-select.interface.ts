import type { TableEntity } from "@graphql";
import type { HallEntity } from "@graphql";

export interface ITableToSelect {
	id: TableEntity["id"];
	name: TableEntity["name"];
	file?: TableEntity["file"];
	hall: {
		id: HallEntity["id"];
		name: HallEntity["name"];
	};
}
