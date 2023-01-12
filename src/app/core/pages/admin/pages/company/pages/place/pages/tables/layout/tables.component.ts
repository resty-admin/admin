import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map, take } from "rxjs";
import { TablesService } from "src/app/features/tables";
import { RouterService } from "src/app/shared/modules/router";

import { DYNAMIC_ID } from "../../../../../../../../../../shared/constants";
import { TABLES_PAGE_I18N } from "../constants";
import { TablesPageGQL } from "../graphql/tables-page";

@UntilDestroy()
@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {
	readonly tablesPageI18n = TABLES_PAGE_I18N;
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();
	readonly tables$: Observable<any> = this._tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));
	readonly actions = this._tablesService.actions;

	constructor(
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(DYNAMIC_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (hallid) => {
				await this._tablesPageQuery.setVariables({ filtersArgs: [{ key: "hall.id", operator: "=", value: hallid }] });
			});

		this._tablesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._tablesPageQuery.refetch();
		});
	}

	openCreateTableDialog() {
		const hall = this._routerService.getParams(DYNAMIC_ID.slice(1));

		if (!hall) {
			return;
		}

		return this._tablesService.openCreateTableDialog({ hall }).pipe(take(1)).subscribe();
	}
}
