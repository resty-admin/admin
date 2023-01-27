import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-payment-system-skeleton",
	templateUrl: "./payment-system-skeleton.component.html",
	styleUrls: ["./payment-system-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemSkeletonComponent {}
