import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { ITooltipTheme } from "../interfaces";

@Component({
	selector: "app-tooltip",
	templateUrl: "./tooltip.component.html",
	styleUrls: ["./tooltip.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {
	@Input() label = "1";
	@Input() theme: ITooltipTheme = "1";

	get className() {
		return `app-tooltip ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
