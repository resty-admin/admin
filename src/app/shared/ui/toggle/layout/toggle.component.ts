import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { ISimpleChanges } from "../../../interfaces";
import { IToggleTheme } from "../interfaces";

@Component({
	selector: "app-toggle",
	templateUrl: "./toggle.component.html",
	styleUrls: ["./toggle.component.scss"],
	providers: getControlValueAccessorProviders(ToggleComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent extends ControlValueAccessor<boolean> implements OnChanges {
	@Input() label = "";
	@Input() theme: IToggleTheme = "1";

	className = `app-toggle ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<ToggleComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-toggle ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
