import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-statistic-header",
	templateUrl: "./statistic-header.component.html",
	styleUrls: ["./statistic-header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticHeaderComponent {
	@Input() tax: number = 0;
	@Input() totalAmount: number = 0;
}
