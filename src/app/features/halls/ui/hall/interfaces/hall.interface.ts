import type { HallEntity } from "../../../../../../graphql";

export interface IHall {
	name: HallEntity["name"];

	file: HallEntity["file"];
}
