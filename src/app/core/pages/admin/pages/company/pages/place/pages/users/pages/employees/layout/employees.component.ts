import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { ActionsService } from "@features/app";
import { AddEmployeeDialogComponent, UserDialogComponent, UsersService } from "@features/users";
import type { UserEntity } from "@graphql";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { EmployeesPageGQL } from "../graphql";

@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnDestroy, OnInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;
	private readonly _employeesPageQuery = this._employeesPageGQL.watch();
	readonly employees$ = this._employeesPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _employeesPageGQL: EmployeesPageGQL,
		private readonly _usersService: UsersService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		await this._employeesPageQuery.setVariables({
			filtersArgs: [
				{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) },
				{ key: "role", operator: "=", value: UserRoleEnum.Waiter }
			]
		});

		this._actionsService.setAction({ label: "Добавить работника", func: () => this.openAddEmployeeDialog() });
	}

	openAddEmployeeDialog() {
		this._dialogService
			.open(AddEmployeeDialogComponent)
			.afterClosed$.pipe(
				filter((employee) => Boolean(employee)),
				switchMap((employee) =>
					this._usersService
						.addEmployeeToPlace({ userId: employee.id, placeId: this._routerService.getParams(PLACE_ID.slice(1)) })
						.pipe(
							switchMap(() => from(this._employeesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("EMPLOYESS.ADD_TO_PLACE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		this._dialogService
			.open(UserDialogComponent, { data })
			.afterClosed$.pipe(
				filter((user) => Boolean(user)),
				switchMap((user) =>
					this._usersService.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel }).pipe(
						switchMap(() => from(this._employeesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("EMPLOYEES.CREATE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: this._i18nService.translate("EMPLOYEES.CONFIRM"),
					value
				}
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._usersService.deleteUser(value.id).pipe(
						switchMap(() => from(this._employeesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("EMPLOYEES.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
