import { Directive, HostBinding, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { IButtonTheme } from "../../interfaces";

@Directive({
	selector: "[appButton]"
})
export class ButtonDirective {
	@Input() theme: IButtonTheme = "1";

	@HostBinding("class")
	get className() {
		return `app-button ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
