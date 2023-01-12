import { ChangeDetectionStrategy, Component } from "@angular/core";

import { WALLET_PAGE_I18N } from "../constants/wallet-page-i18n.constant";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
	readonly walletPageI18n = WALLET_PAGE_I18N;
}
