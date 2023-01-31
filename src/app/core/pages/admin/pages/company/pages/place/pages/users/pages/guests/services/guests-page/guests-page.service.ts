import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { GuestsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class GuestsPageService {
	readonly guestsPageQuery = this._guestsPagesGQL.watch();

	readonly guests$ = this.guestsPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

	constructor(private readonly _guestsPagesGQL: GuestsPageGQL) {}
}
