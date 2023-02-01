import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-payment-systems-page-skeleton",
	templateUrl: "./payment-systems-page-skeleton.component.html",
	styleUrls: ["./payment-systems-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsPageSkeletonComponent {}
