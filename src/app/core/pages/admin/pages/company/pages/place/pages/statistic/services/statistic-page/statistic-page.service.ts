import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { StatisticPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class StatisticPageService {
	readonly statisticPageQuery = this._statisticPageGQL.watch();

	readonly statisticPage$ = this.statisticPageQuery.valueChanges.pipe(map((result) => result.data));

	constructor(private readonly _statisticPageGQL: StatisticPageGQL) {}
}
