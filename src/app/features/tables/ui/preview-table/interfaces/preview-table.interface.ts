import type { HallEntity, TableEntity } from "../../../../../../graphql";

export interface IPreviewTable {
	file?: TableEntity["file"];
	name: TableEntity["name"];
	hall?: {
		id: HallEntity["id"];
		name: HallEntity["name"];
	};
}
