import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { shareReplay } from "rxjs";

import { AuthService } from "../../../../auth/services";

@UntilDestroy()
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	readonly formGroup = this._formBuilder.group<any>({
		name: "",
		tel: "",
		email: ""
	});

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	ngOnInit() {
		this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
			if (!user) {
				return;
			}

			this.formGroup.patchValue(user);
		});
	}

	updateMe(formValue: any) {
		this._authService.updateMe(formValue).subscribe();
	}

	deleteMe() {
		this._authService.deleteMe().subscribe();
	}
}
