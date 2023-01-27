import { ChangeDetectionStrategy, Component } from "@angular/core";

import { WALLET_PAGE } from "../constants";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
	readonly walletPage = WALLET_PAGE;
}
