import type { HallEntity } from "../../../../../../graphql";

export interface ISelectHall {
	id: HallEntity["id"];
	name: HallEntity["name"];
}
