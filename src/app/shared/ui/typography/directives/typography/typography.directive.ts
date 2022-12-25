import { Directive, HostBinding, Input } from "@angular/core";

import { ANY_SYMBOL, THEME } from "../../../../constants";
import { ITypographyTheme } from "../../interfaces";

@Directive({
	selector: "[appTypography]"
})
export class TypographyDirective {
	@Input() theme: ITypographyTheme = "0";

	@HostBinding("class")
	get className() {
		return `app-typography ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
