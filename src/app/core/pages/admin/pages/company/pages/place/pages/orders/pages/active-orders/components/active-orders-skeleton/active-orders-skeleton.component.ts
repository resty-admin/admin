import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-active-orders-skeleton",
	templateUrl: "./active-orders-skeleton.component.html",
	styleUrls: ["./active-orders-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersSkeletonComponent {}
