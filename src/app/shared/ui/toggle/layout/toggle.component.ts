import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { IToggleTheme } from "../interfaces";

@Component({
	selector: "app-toggle",
	templateUrl: "./toggle.component.html",
	styleUrls: ["./toggle.component.scss"],
	providers: getControlValueAccessorProviders(ToggleComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent extends ControlValueAccessor<boolean> {
	@Input() label = "";
	@Input() theme: IToggleTheme = "1";

	get className() {
		return `app-toggle ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
