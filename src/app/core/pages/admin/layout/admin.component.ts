import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { shareReplay } from "rxjs";

import { AuthService } from "../../auth/services";
import { AsideService } from "../services/aside/aside.service";

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
	readonly places$ = this._asideService.places$;
	readonly companies$ = this._asideService.companies$;
	readonly activePlaceId$ = this._asideService.activePlaceId$;
	readonly activeCompanyId$ = this._asideService.activeCompanyId$;
	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	isAsideOpen = false;

	constructor(private readonly _asideService: AsideService, private readonly _authService: AuthService) {}

	toggleAside() {
		this.isAsideOpen = !this.isAsideOpen;
	}
}
