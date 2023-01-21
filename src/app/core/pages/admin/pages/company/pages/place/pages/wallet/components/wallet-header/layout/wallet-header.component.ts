import { ChangeDetectionStrategy, Component } from "@angular/core";
import { getI18nProvider } from "@shared/i18n";

import { WALLET_HEADER_I18N } from "../constants";
@Component({
	selector: "app-wallet-header",
	templateUrl: "./wallet-header.component.html",
	styleUrls: ["./wallet-header.component.scss"],
	providers: [getI18nProvider(WALLET_HEADER_I18N, (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletHeaderComponent {
	readonly walletHeaderI18n = WALLET_HEADER_I18N;
}
