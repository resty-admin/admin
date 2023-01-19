import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";

import type { UserEntity } from "../../../../../../../../../../../../../graphql";
import { UsersService } from "../../../../../../../../../../../../features/users";
import { UserDialogComponent } from "../../../../../../../../../../../../features/users/ui";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import type { AtLeast } from "../../../../../../../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import type { IDatatableColumn } from "../../../../../../../../../../../../shared/ui/datatable";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { GUESTS_PAGE_I18N } from "../constants";
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

	readonly guestsPageI18n = GUESTS_PAGE_I18N;

	private readonly _guestsPageQuery = this._guestsPageGQL.watch();
	readonly users$ = this._guestsPageQuery.valueChanges.pipe(map((result) => result.data.users.data));
	readonly actions: IAction<UserEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (user) => this.openUpdateUserDialog(user)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (user) => this.openDeleteUserDialog(user)
		}
	];

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService,
		private readonly _guestsPageGQL: GuestsPageGQL,
		private readonly _dialogService: DialogService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		await this._guestsPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
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

	async openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		const user: UserEntity | undefined = await lastValueFrom(
			this._dialogService.open(UserDialogComponent, { data }).afterClosed$
		);

		if (!user) {
			return;
		}

		await lastValueFrom(
			this._usersService.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel })
		);

		await this._guestsPageQuery.refetch();
	}

	async openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить пользователя?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._usersService.deleteUser(value.id));

		await this._guestsPageQuery.refetch();
	}
}
