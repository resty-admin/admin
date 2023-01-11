import { ChangeDetectionStrategy, Component } from "@angular/core";

import { CardsService } from "../../../../../../../../../../features/cards/services";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
	readonly cards = [{ name: "Mikhail Khomenko", code: "**** **** **** 0000" }];

	constructor(private readonly _cardsService: CardsService) {}

	openCreateCardDialog() {
		this._cardsService.openCreateCardDialog().subscribe();
	}
}
