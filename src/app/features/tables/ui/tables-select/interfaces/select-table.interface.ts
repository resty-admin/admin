import type { TableEntity } from "../../../../../../graphql";

export interface ISelectTable {
	id: TableEntity["id"];
	name: TableEntity["name"];
	file?: TableEntity["file"];
}
