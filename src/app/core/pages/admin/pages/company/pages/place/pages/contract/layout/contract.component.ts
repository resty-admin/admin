import { ChangeDetectionStrategy, Component } from "@angular/core";

import { CONTRACT_PAGE_I18N } from "../constants";

@Component({
	selector: "app-contract",
	templateUrl: "./contract.component.html",
	styleUrls: ["./contract.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent {
	readonly contractPageI18n = CONTRACT_PAGE_I18N;
}
