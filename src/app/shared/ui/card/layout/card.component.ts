import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { ICardTheme } from "../interfaces";

@Component({
	selector: "app-card",
	templateUrl: "./card.component.html",
	styleUrls: ["./card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
	@Input() theme: ICardTheme = "1";
	@Input() label = "";

	get className() {
		return `app-card ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
