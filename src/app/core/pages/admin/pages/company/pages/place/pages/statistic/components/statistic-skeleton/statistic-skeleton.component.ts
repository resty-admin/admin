import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-statistic-skeleton",
	templateUrl: "./statistic-skeleton.component.html",
	styleUrls: ["./statistic-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticSkeletonComponent {}
