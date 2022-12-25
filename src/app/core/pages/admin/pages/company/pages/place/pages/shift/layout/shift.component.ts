import { ChangeDetectionStrategy, Component } from "@angular/core";

import { HallsService } from "../../../../../../../../../../shared/modules/halls";
import { TablesService } from "../../../../../../../../../../shared/modules/tables";

@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent {
	readonly selectedTables: any[] = [
		{ label: "Зал 1, стол 4", value: "" },
		{ label: "Зал 2, стол 2", value: "" },
		{ label: "Зал 1, стол 6", value: "" }
	];

	readonly halls$ = this._hallsService.halls$;
	readonly tables$ = this._tablesService.tables$;

	constructor(private readonly _hallsService: HallsService, private readonly _tablesService: TablesService) {}
}
