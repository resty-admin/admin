import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { WALLET_PAGE } from "../../constants";
@Component({
	selector: "app-wallet-header",
	templateUrl: "./wallet-header.component.html",
	styleUrls: ["./wallet-header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletHeaderComponent {
	readonly walletPage = WALLET_PAGE;

	@Input() tax: number = 0;
	@Input() totalAmount: number = 0;
}
