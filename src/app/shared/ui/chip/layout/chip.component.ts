import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import type { ISimpleChanges } from "../../../interfaces";
import { IChipTheme } from "../interfaces";

@Component({
	selector: "app-chip",
	templateUrl: "./chip.component.html",
	styleUrls: ["./chip.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnChanges {
	@Input() theme: IChipTheme = "1";
	@Input() label = "";

	className = `app-chip ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	ngOnChanges(changes: ISimpleChanges<ChipComponent>) {
		if (changes.theme) {
			this.className = `app-chip ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}
	}
}
