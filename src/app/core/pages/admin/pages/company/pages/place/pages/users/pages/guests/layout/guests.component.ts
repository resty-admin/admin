import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { UsersService } from "../../../../../../../../../../../../features/users";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IDatatableColumn } from "../../../../../../../../../../../../shared/ui/datatable";
import { GuestsPageGQL } from "../graphql/guests-page";

@UntilDestroy()
@Component({
	selector: "app-guests",
	templateUrl: "./guests.component.html",
	styleUrls: ["./guests.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent implements OnInit, AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	private readonly _guestsPageQuery = this._guestsPageGQL.watch();
	readonly users$: Observable<any> = this._guestsPageQuery.valueChanges.pipe(map((result) => result.data.users.data));
	readonly actions = this._usersService.actions;
	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService,
		private readonly _guestsPageGQL: GuestsPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._guestsPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
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
