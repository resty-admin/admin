import { Injectable } from "@angular/core";

import type { CreateHallInput, UpdateHallInput } from "../../../../../graphql";
import { CreateHallGQL, DeleteHallGQL, UpdateHallGQL } from "../../graphql/halls";

@Injectable({ providedIn: "root" })
export class HallsService {
	constructor(
		private readonly _createHallGQL: CreateHallGQL,
		private readonly _updateHallGQL: UpdateHallGQL,
		private readonly _deleteHallGQL: DeleteHallGQL
	) {}

	createHall(hall: CreateHallInput) {
		return this._createHallGQL.mutate({ hall });
	}

	updateHall(hall: UpdateHallInput) {
		return this._updateHallGQL.mutate({ hall });
	}

	deleteHall(hallId: string) {
		return this._deleteHallGQL.mutate({ hallId });
	}
}
