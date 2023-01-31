import { ChangeDetectionStrategy, Component } from "@angular/core";

import { CORE_PAGE } from "../../constants";

@Component({
	selector: "app-support",
	templateUrl: "./support.component.html",
	styleUrls: ["./support.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportComponent {
	readonly corePage = CORE_PAGE;
}
