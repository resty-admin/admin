import { ChangeDetectionStrategy, Component } from "@angular/core";

import { HALL_PAGE_I18N } from "../constants";

@Component({
	selector: "app-hall",
	templateUrl: "./hall.component.html",
	styleUrls: ["./hall.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallComponent {
	readonly hallPageI18n = HALL_PAGE_I18N;
}
