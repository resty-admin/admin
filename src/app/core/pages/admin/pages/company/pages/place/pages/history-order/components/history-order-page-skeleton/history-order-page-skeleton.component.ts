import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-history-order-page-skeleton",
	templateUrl: "./history-order-page-skeleton.component.html",
	styleUrls: ["./history-order-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderPageSkeletonComponent {}
