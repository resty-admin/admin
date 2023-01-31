import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { HallsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsPageService {
	readonly hallsPageQuery = this._hallsPageGQL.watch();
	readonly halls$ = this.hallsPageQuery.valueChanges.pipe(map((result) => result.data.halls.data));

	constructor(private readonly _hallsPageGQL: HallsPageGQL) {}
}
