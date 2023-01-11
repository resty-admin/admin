import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { UsersService } from "../../../../../../../../../../../../features/users";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IDatatableColumn } from "../../../../../../../../../../../../shared/ui/datatable";
import { WorkersPageGQL } from "../graphql/workers-page";

@UntilDestroy()
@Component({
	selector: "app-workers",
	templateUrl: "./workers.component.html",
	styleUrls: ["./workers.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit, AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	private readonly _workersPageQuery = this._workersPageGQL.watch();
	readonly users$: Observable<any> = this._workersPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

	readonly actions = this._usersService.actions;
	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _workersPageGQL: WorkersPageGQL,
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._workersPageQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "name",
				name: "ФИО"
			},
			{
				prop: "email",
				name: "Почта"
			},
			{
				prop: "tel",
				name: "Телефон"
			},
			{
				prop: "role",
				name: "Роль"
			},
			{
				cellTemplate: this.moreTemplate
			}
		];
	}
}
