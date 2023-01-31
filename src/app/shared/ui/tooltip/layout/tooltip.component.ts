import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";

import { ITooltipTheme } from "../interfaces";

@Component({
	selector: "app-tooltip",
	templateUrl: "./tooltip.component.html",
	styleUrls: ["./tooltip.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnChanges {
	@Input() label = "1";
	@Input() theme: ITooltipTheme = "1";

	className = `app-tooltip ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	ngOnChanges(changes: ISimpleChanges<TooltipComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-tooltip ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}
	}
}
