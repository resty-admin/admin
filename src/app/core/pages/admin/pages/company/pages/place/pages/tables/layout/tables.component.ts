import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { TablesService } from "src/app/features/tables";
import { RouterService } from "src/app/shared/modules/router";

import { DYNAMIC_ID } from "../../../../../../../../../../shared/constants";
import { TablesPageGQL } from "../graphql/tables-page";

@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent {
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();
	readonly tables$: Observable<any> = this._tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));
	readonly actions = this._tablesService.actions;

	constructor(
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService
	) {}

	openCreateTableDialog() {
		const hall = this._routerService.getParams(DYNAMIC_ID.slice(1));

		return this._tablesService.createTable(hall).subscribe();
	}
}
