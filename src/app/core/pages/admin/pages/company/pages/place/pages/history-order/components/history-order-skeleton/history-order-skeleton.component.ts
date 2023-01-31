import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-history-order-skeleton",
	templateUrl: "./history-order-skeleton.component.html",
	styleUrls: ["./history-order-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderSkeletonComponent {}
