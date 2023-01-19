import type { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import type { DeepPartial } from "@ngneat/reactive-forms/lib/types";
import { UntilDestroy } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";

import type { UserEntity } from "../../../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../../../features/app";
import { UsersService } from "../../../../../../../../../../../../features/users";
import { AddEmployeeDialogComponent, UserDialogComponent } from "../../../../../../../../../../../../features/users/ui";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import type { AtLeast } from "../../../../../../../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import type { IDatatableColumn } from "../../../../../../../../../../../../shared/ui/datatable";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../../../shared/ui/toastr";
import { EMPLOYEES_PAGE_I18N } from "../constants";
import { EmployeesPageGQL } from "../graphql/employees-page";

@UntilDestroy()
@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly employeesPageI18n = EMPLOYEES_PAGE_I18N;

	private readonly _employeesPageQuery = this._employeesPageGQL.watch();
	readonly users$ = this._employeesPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

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
		private readonly _employeesPageGQL: EmployeesPageGQL,
		private readonly _usersService: UsersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
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

		await this._employeesPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	async openAddEmployeeDialog() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		const user: UserEntity | undefined = await lastValueFrom(
			this._dialogService.open(AddEmployeeDialogComponent).afterClosed$
		);

		if (!user) {
			return;
		}

		await lastValueFrom(
			this._usersService
				.addEmployeeToPlace({ userId: user.id, placeId })
				.pipe(this._toastrService.observe("Сотрудники"))
		);

		await this._employeesPageQuery.refetch();
	}

	async openCreateUserDialog(data?: DeepPartial<UserEntity>) {
		const user: UserEntity | undefined = await lastValueFrom(
			this._dialogService.open(UserDialogComponent, { data }).afterClosed$
		);

		if (!user) {
			return;
		}

		await lastValueFrom(
			this._usersService
				.createUser({ name: user.name, email: user.name, role: user.role })
				.pipe(this._toastrService.observe("Сотрудники"))
		);

		await this._employeesPageQuery.refetch();
	}

	async openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		const user: UserEntity | undefined = await lastValueFrom(
			this._dialogService.open(UserDialogComponent, { data }).afterClosed$
		);

		if (!user) {
			return;
		}

		await lastValueFrom(
			this._usersService
				.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel })
				.pipe(this._toastrService.observe("Сотрудники"))
		);

		await this._employeesPageQuery.refetch();
	}

	async openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить пользователя?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._usersService.deleteUser(value.id).pipe(this._toastrService.observe("Сотрудники")));

		await this._employeesPageQuery.refetch();
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
