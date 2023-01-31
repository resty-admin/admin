import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, take } from "rxjs";

import { WELCOME_PAGE } from "../constants";
import type { IWelcomeForm } from "../interfaces";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit, OnDestroy {
	readonly welcomePage = WELCOME_PAGE;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group<IWelcomeForm>({
		name: "",
		tel: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	async ngOnInit() {
		const user = await lastValueFrom(this._authService.me$.pipe(take(1)));

		if (user) {
			this.formGroup.patchValue(user);
		}

		this._actionsService.setAction({
			label: "Подтвердить",
			func: () => this.updateMe(this.formGroup.value)
		});
	}

	async updateMe(value: IWelcomeForm) {
		try {
			await lastValueFrom(this._authService.updateMe(value));

			await this._authService.getMeQuery.refetch();
			await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANIES.absolutePath);
		} catch (error) {
			console.error(error);
		}
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}