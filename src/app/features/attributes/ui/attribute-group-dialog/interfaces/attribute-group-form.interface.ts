import type { AttributesGroupEntity } from "@graphql";

export interface IAttributeGroupForm {
	name: AttributesGroupEntity["name"];
	attributes?: string[] | null;
	maxItemsForPick: AttributesGroupEntity["maxItemsForPick"];
	type: AttributesGroupEntity["type"];
}
