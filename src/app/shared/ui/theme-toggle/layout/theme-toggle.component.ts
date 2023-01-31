import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";

import { IThemeToggleTheme } from "../interfaces";

@Component({
	selector: "app-theme-toggle",
	templateUrl: "./theme-toggle.component.html",
	styleUrls: ["./theme-toggle.component.scss"],
	providers: getControlValueAccessorProviders(ThemeToggleComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent extends ControlValueAccessor<boolean> implements OnChanges {
	@Input() label = "";
	@Input() theme: IThemeToggleTheme = "1";

	className = `app-theme-toggle ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<ThemeToggleComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-theme-toggle ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
