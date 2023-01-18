import type { AttributesGroupEntity } from "../../../../../../graphql";

export interface IAttributeGroupForm {
	name: AttributesGroupEntity["name"];
	attributes: AttributesGroupEntity["attributes"];
	maxItemsForPick: AttributesGroupEntity["maxItemsForPick"];
	type: AttributesGroupEntity["type"];
}
