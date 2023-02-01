import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-statistic-page-skeleton",
	templateUrl: "./statistic-page-skeleton.component.html",
	styleUrls: ["./statistic-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticPageSkeletonComponent {}
