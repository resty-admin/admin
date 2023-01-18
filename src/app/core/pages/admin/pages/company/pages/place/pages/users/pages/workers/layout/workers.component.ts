import type { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";

import { ActionsService } from "../../../../../../../../../../../../features/app";
import { UsersService } from "../../../../../../../../../../../../features/users";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IDatatableColumn } from "../../../../../../../../../../../../shared/ui/datatable";
import { WORKERS_PAGE_I18N } from "../constants";
import { WorkersPageGQL } from "../graphql/workers-page";

@UntilDestroy()
@Component({
	selector: "app-workers",
	templateUrl: "./workers.component.html",
	styleUrls: ["./workers.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly workersPageI18n = WORKERS_PAGE_I18N;

	private readonly _workersPageQuery = this._workersPageGQL.watch();
	readonly users$ = this._workersPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

	readonly actions = this._usersService.actions;
	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _workersPageGQL: WorkersPageGQL,
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const { placeId } = this._routerService.getParams();

		if (!placeId) {
			return;
		}

		this._usersService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._workersPageQuery.refetch();
		});

		this._actionsService.setAction({
			label: "Добавить работника",
			func: () => this.openCreateUserDialog()
		});

		await this._workersPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	openCreateUserDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		return this._usersService.openCreateUserDialog({ place });
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

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
