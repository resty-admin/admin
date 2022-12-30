import { Inject } from "@angular/core";
import { map } from "rxjs";

import { ShiftsGQL } from "../../graphql/shift";

@Inject({ providedIn: "root" })
export class ShiftsService {
	readonly shifts$ = this._shiftsGQL.watch().valueChanges.pipe(map((result) => result.data.shifts.data));

	constructor(private readonly _shiftsGQL: ShiftsGQL) {}

	async refetch() {
		await this._shiftsGQL.watch().refetch();
	}
}
