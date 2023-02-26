import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
import { ACCESS_TOKEN, ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { switchMap, take } from "rxjs";

@Component({
	selector: "app-google",
	templateUrl: "./google.component.html",
	styleUrls: ["./google.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	async ngOnInit() {
		const accessToken = this._routerService.getParams(ACCESS_TOKEN);

		await this._authService.updateAccessToken(accessToken);

		const role = this._routerService.getQueryParams("role");

		this._authService
			.updateMe({ role })
			.pipe(
				take(1),
				switchMap(() => this._authService.refetch())
			)
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
