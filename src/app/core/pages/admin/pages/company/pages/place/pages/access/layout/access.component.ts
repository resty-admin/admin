import { ChangeDetectionStrategy, Component } from "@angular/core";

import { ACCESS_PAGE } from "../constants";

@Component({
	selector: "app-access",
	templateUrl: "./access.component.html",
	styleUrls: ["./access.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessComponent {
	readonly accessPage = ACCESS_PAGE;
}
