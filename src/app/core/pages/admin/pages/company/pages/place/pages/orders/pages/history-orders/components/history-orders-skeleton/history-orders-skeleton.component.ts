import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-history-orders-skeleton",
	templateUrl: "./history-orders-skeleton.component.html",
	styleUrls: ["./history-orders-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersSkeletonComponent {}
