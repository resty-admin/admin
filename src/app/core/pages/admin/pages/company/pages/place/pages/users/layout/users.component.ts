import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import type { Observable } from "rxjs";
import { UsersService } from "src/app/features/users";
import { PLACE_ID } from "src/app/shared/constants";
import type { IUser } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import type { IAction } from "../../../../../../../../../../shared/ui/actions";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly actions: IAction<IUser>[] = this._usersService.actions;

	readonly users$: Observable<any> = this._usersService.users$;

	columns: IDatatableColumn[] = [];

	constructor(private readonly _usersService: UsersService, private readonly _routerService: RouterService) {}

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
