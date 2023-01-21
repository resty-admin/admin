import type { HallEntity } from "@graphql";

export interface IHallForm {
	name: HallEntity["name"];
	file: HallEntity["file"];
}
