import type { TableEntity } from "../../../../../../../../../../../graphql";

export interface IShiftForm {
	id: string;
	tables: {
		id: TableEntity["id"];
		name: TableEntity["name"];
	}[];
}
