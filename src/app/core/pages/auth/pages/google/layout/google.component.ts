import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { switchMap, take } from "rxjs";

import { AuthService } from "../../../../../../features/auth/services";
import { ADMIN_ROUTES } from "../../../../../../shared/constants";
import { RouterService } from "../../../../../../shared/modules/router";

@UntilDestroy()
@Component({
	selector: "app-google",
	templateUrl: "./google.component.html",
	styleUrls: ["./google.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(
				untilDestroyed(this),
				switchMap((googleUser) => this._authService.google(googleUser).pipe(take(1)))
			)
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
