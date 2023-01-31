import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { TablesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesPageService {
	readonly tablesPageQuery = this._tablesPageGQL.watch();

	readonly tables$ = this.tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));

	constructor(private readonly _tablesPageGQL: TablesPageGQL) {}
}
