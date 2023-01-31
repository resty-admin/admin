import { Directive, HostBinding, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";

import { IIconButtonTheme } from "../../interfaces";

@Directive({
	selector: "[appIconButton]"
})
export class IconButtonDirective {
	@Input() theme: IIconButtonTheme = "1";

	@HostBinding("class")
	get className() {
		return `app-icon-button ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
