import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-history-orders-page-skeleton",
	templateUrl: "./history-orders-page-skeleton.component.html",
	styleUrls: ["./history-orders-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersPageSkeletonComponent {}
