import type { PlaceEntity } from "../../../../../../graphql";

export interface IPlaceForm {
	name: PlaceEntity["name"];
	address: PlaceEntity["address"];
	file: PlaceEntity["file"];
}
