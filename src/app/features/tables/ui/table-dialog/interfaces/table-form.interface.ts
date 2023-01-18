import type { TableEntity } from "../../../../../../graphql";

export interface ITableForm {
	code: TableEntity["code"];
	name: TableEntity["name"];
	file: string;
}
