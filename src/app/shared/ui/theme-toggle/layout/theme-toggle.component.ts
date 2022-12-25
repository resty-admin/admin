import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { IThemeToggleTheme } from "../interfaces";

@Component({
	selector: "app-theme-toggle",
	templateUrl: "./theme-toggle.component.html",
	styleUrls: ["./theme-toggle.component.scss"],
	providers: getControlValueAccessorProviders(ThemeToggleComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent extends ControlValueAccessor<boolean> {
	@Input() label = "";
	@Input() theme: IThemeToggleTheme = "1";

	get className() {
		return `app-theme-toggle ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
