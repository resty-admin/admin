import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { UsersService } from "../../../../../../../../../../../../features/users";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
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

	readonly actions: IAction<any>[] = this._usersService.actions;

	columns: IDatatableColumn[] = [];

	private readonly _workersPageQuery = this._workersPageGQL.watch();
	readonly users$: Observable<any> = this._workersPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

	constructor(
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService,
		private readonly _workersPageGQL: WorkersPageGQL
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

	openCreateUserDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));
		this._usersService.openCreateOrUpdateUserDialog({ place }).subscribe();
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
