import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import type { ISimpleChanges } from "../../../interfaces";
import { ICardTheme } from "../interfaces";

@Component({
	selector: "app-card",
	templateUrl: "./card.component.html",
	styleUrls: ["./card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges {
	@Input() theme: ICardTheme = "1";
	@Input() label = "";

	className = `app-card ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	ngOnChanges(changes: ISimpleChanges<CardComponent>) {
		if (changes.theme) {
			this.className = `app-card ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}
	}
}
