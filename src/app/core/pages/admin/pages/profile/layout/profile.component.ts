import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { UserRoleEnum } from "@graphql";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { LanguagesEnum } from "@shared/enums";
import type { ThemeEnum } from "@shared/enums";
import { I18nService } from "@shared/modules/i18n";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { switchMap, take } from "rxjs";

import type { IProfileForm } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
	readonly user$ = this._authService.me$;

	readonly userRoleEnum = UserRoleEnum;

	readonly formGroup = this._formBuilder.group<IProfileForm>({
		name: "",
		tel: "",
		email: ""
	});

	readonly language$ = this._authService.language$;
	readonly theme$ = this._authService.theme$;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this.user$.pipe(take(1)).subscribe((user) => {
			if (!user) {
				return;
			}

			this.formGroup.patchValue(user);
		});

		this._actionsService.setAction({
			label: "UPDATE_USER",
			func: () => {
				if (!this.formGroup.value) {
					return;
				}

				this.updateMe(this.formGroup.value);
			}
		});
	}

	changeLanguage(language: LanguagesEnum) {
		this._authService.updateLanguage(language);
	}

	changeTheme(theme: ThemeEnum) {
		this._authService.updateTheme(theme);
	}

	updateMe(formValue: IProfileForm) {
		this._authService
			.updateMe(formValue)
			.pipe(
				take(1),
				switchMap(() => this._authService.refetch())
			)
			.subscribe();
	}

	deleteMe() {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("USERS.CONFIRM"), value: {} }
			})
			.afterClosed$.pipe(switchMap(() => this._authService.deleteMe()))
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
