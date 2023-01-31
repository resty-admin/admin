import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-active-order-skeleton",
	templateUrl: "./active-order-skeleton.component.html",
	styleUrls: ["./active-order-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderSkeletonComponent {}
