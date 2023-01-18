import type { TableEntity } from "../../../../../../graphql";

export interface ITable {
	file: TableEntity["file"];
	name: TableEntity["name"];
	code: TableEntity["code"];
}
