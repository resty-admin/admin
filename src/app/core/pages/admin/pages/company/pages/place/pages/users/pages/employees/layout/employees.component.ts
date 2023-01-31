import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { ActionsService } from "@features/app";
import { AddEmployeeDialogComponent, UserDialogComponent, UsersService } from "@features/users";
import type { UserEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, switchMap, take } from "rxjs";

import { EMPLOYEES_PAGE } from "../constants";
import { EmployeesPageService } from "../services";

@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnDestroy, OnInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;
	readonly employeesPage = EMPLOYEES_PAGE;
	readonly employees$ = this._employeesPageService.employees$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _employeesPageService: EmployeesPageService,
		private readonly _usersService: UsersService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
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
							switchMap(() => from(this._employeesPageService.employeesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("title"))
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
						switchMap(() => from(this._employeesPageService.employeesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("title"))
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
					title: this._i18nService.translate("confirm"),
					value
				}
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._usersService.deleteUser(value.id).pipe(
						switchMap(() => from(this._employeesPageService.employeesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("title"))
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
