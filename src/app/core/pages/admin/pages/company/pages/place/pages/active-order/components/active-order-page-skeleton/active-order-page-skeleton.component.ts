import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-active-order-page-skeleton",
	templateUrl: "./active-order-page-skeleton.component.html",
	styleUrls: ["./active-order-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderPageSkeletonComponent {}
