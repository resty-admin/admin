import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { Observable } from "rxjs";
import { TablesService } from "src/app/features/tables";
import { RouterService } from "src/app/shared/modules/router";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { DYNAMIC_ID } from "../../../../../../../../../../shared/constants";

@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly actions = this._tablesService.actions;

	readonly tables$: Observable<any> = this._tablesService.tables$;

	constructor(private readonly _tablesService: TablesService, private readonly _routerService: RouterService) {}

	openCreateTableDialog() {
		const hall = this._routerService.getParams(DYNAMIC_ID.slice(1));
		this._tablesService.openCreateOrUpdateTableDialog({ hall }).subscribe();
	}
}
