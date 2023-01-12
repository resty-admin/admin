import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AUHT_PAGE_I18N } from "../constants";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
	readonly authPageI18n = AUHT_PAGE_I18N;
}
