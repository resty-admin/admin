import type { PlaceEntity } from "@graphql";

export interface IPlaceForm {
	name: PlaceEntity["name"];
	address: PlaceEntity["address"];
	file: PlaceEntity["file"];
	weekDays: PlaceEntity["weekDays"];
	weekendDays: PlaceEntity["weekendDays"];
	a11y: PlaceEntity["a11y"];
}
