import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

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

	ngOnInit() {
		this._authService.me$.pipe(take(1)).subscribe((user) => {
			if (!user) {
				return;
			}

			this.formGroup.patchValue(user);
		});

		this._actionsService.setAction({
			label: "Подтвердить",
			func: () => this.updateMe(this.formGroup.value)
		});
	}

	updateMe(value: IWelcomeForm) {
		this._authService
			.updateMe(value)
			.pipe(take(1))
			.subscribe(async () => {
				await this._authService.getMeQuery.refetch();
				await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANIES.absolutePath);
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
