import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AsideService } from "../../../../features/app";

@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
	readonly isAsideOpen$ = this._asideService.isOpen$;

	constructor(private readonly _asideService: AsideService) {}
}
