import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-statistic-card",
	templateUrl: "./statistic-card.component.html",
	styleUrls: ["./statistic-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticCardComponent {
	@Input() label = "";
	@Input() value?: number | null;
	@Input() icon = "";
	@Input() link = "";
}
