import type { HallEntity } from "../../../../../../graphql";

export interface IHallToSelect {
	id: HallEntity["id"];
	name: HallEntity["name"];
}
