import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { IChipTheme } from "../interfaces";

@Component({
	selector: "app-chip",
	templateUrl: "./chip.component.html",
	styleUrls: ["./chip.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
	@Input() theme: IChipTheme = "1";
	@Input() label = "";

	get className() {
		return `app-chip ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
