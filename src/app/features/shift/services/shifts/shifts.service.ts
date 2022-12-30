import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ShiftsGQL } from "../../graphql/shift";

@Injectable({ providedIn: "root" })
export class ShiftsService {
	readonly shifts$ = this._shiftsGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.shifts.data));

	constructor(private readonly _shiftsGQL: ShiftsGQL) {}

	async refetch() {
		await this._shiftsGQL.watch({ skip: 0, take: 5 }).refetch();
	}
}
