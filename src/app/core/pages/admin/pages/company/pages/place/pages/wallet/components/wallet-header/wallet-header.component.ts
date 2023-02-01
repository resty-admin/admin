import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-wallet-header",
	templateUrl: "./wallet-header.component.html",
	styleUrls: ["./wallet-header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletHeaderComponent {
	@Input() tax: number = 0;
	@Input() totalAmount: number = 0;
}
