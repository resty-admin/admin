import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-payment-system",
	templateUrl: "./payment-system.component.html",
	styleUrls: ["./payment-system.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemComponent {
	@Input() paymentSystem: any;
}
