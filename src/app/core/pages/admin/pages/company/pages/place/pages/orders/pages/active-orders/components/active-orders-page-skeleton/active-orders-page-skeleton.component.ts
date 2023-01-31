import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-active-orders-page-skeleton",
	templateUrl: "./active-orders-page-skeleton.component.html",
	styleUrls: ["./active-orders-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersPageSkeletonComponent {}
