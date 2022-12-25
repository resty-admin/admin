import { Directive, HostBinding, Input } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { ILinkTheme } from "../../interfaces";

@Directive({
	selector: "[appLink]"
})
export class LinkDirective {
	@Input() theme: ILinkTheme = "1";
	@Input() disabled = false;

	@HostBinding("class")
	get className() {
		return `app-link ${THEME.replace(ANY_SYMBOL, this.theme)} ${this.disabled ? "disabled" : ""}`;
	}
}
