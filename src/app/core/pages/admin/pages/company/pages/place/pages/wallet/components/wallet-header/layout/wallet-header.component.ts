import { ChangeDetectionStrategy, Component } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
@Component({
	selector: "app-wallet-header",
	templateUrl: "./wallet-header.component.html",
	styleUrls: ["./wallet-header.component.scss"],
	providers: [getI18nProvider("walletHeader", (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletHeaderComponent {}
