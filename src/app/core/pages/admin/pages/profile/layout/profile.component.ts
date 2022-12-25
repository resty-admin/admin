import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

import { AuthService } from "../../../../auth/services";

@UntilDestroy()
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
	readonly user$ = this._authService.getMe();

	constructor(private readonly _authService: AuthService) {}
}
