import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-payment-systems-skeleton",
	templateUrl: "./payment-systems-skeleton.component.html",
	styleUrls: ["./payment-systems-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsSkeletonComponent {}
