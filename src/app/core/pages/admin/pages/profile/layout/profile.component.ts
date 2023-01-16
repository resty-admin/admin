import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { firstValueFrom } from "rxjs";

import { ActionsService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { FORM_I18N } from "../../../../../constants";
import { PROFILE_PAGE_I18N } from "../constants";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
	readonly formI18n = FORM_I18N;
	readonly profilePageI18n = PROFILE_PAGE_I18N;
	readonly user$ = this._authService.me$;

	readonly formGroup = this._formBuilder.group<any>({
		name: "",
		tel: "",
		email: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService
	) {}

	async ngOnInit() {
		const user = await firstValueFrom(this.user$);

		if (!user) {
			return;
		}

		this.formGroup.patchValue(user);

		this._actionsService.setAction({
			label: "Обновить пользователя",
			func: () => this.updateMe(this.formGroup.value)
		});
	}

	updateMe(formValue: any) {
		this._authService.updateMe(formValue).subscribe();
	}

	deleteMe() {
		this._authService.deleteMe().subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
