import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { CardsService } from "../../../../../../../../../../../features/cards/services";

@Component({
	selector: "app-wallet-card",
	templateUrl: "./wallet-card.component.html",
	styleUrls: ["./wallet-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletCardComponent {
	@Input() card: any;

	readonly actions = this._cardsService.actions;

	constructor(private readonly _cardsService: CardsService) {}
}
