import type { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import type { DeepPartial } from "@ngneat/reactive-forms/lib/types";
import { UntilDestroy } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";

import type { UserEntity } from "../../../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../../../features/app";
import { UsersService } from "../../../../../../../../../../../../features/users";
import { UserDialogComponent } from "../../../../../../../../../../../../features/users/ui";
import type { AtLeast } from "../../../../../../../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import type { IDatatableColumn } from "../../../../../../../../../../../../shared/ui/datatable";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
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
		private readonly _workersPageGQL: WorkersPageGQL,
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const { placeId } = this._routerService.getParams();

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить работника",
			func: () => this.openCreateUserDialog()
		});

		await this._workersPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	async openCreateUserDialog(data?: DeepPartial<UserEntity>) {
		const user: UserEntity | undefined = await lastValueFrom(
			this._dialogService.open(UserDialogComponent, { data }).afterClosed$
		);

		if (!user) {
			return;
		}

		await lastValueFrom(this._usersService.createUser({ name: user.name, email: user.name, role: user.role }));

		await this._workersPageQuery.refetch();
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

		await this._workersPageQuery.refetch();
	}

	async openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить пользователя?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._usersService.deleteUser(value.id));

		await this._workersPageQuery.refetch();
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
