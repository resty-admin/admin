import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-statistic-card-skeleton",
	templateUrl: "./statistic-card-skeleton.component.html",
	styleUrls: ["./statistic-card-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticCardSkeletonComponent {}
