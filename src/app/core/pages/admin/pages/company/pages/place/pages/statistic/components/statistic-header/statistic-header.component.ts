import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { STATISTIC_PAGE } from "../../constants";

@Component({
	selector: "app-statistic-header",
	templateUrl: "./statistic-header.component.html",
	styleUrls: ["./statistic-header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticHeaderComponent {
	readonly statisticPage = STATISTIC_PAGE;

	@Input() tax: number = 0;
	@Input() totalAmount: number = 0;
}
