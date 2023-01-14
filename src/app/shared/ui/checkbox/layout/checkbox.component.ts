import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { ISimpleChanges } from "../../../interfaces";
import { ICheckboxTheme } from "../interfaces";

@Component({
	selector: "app-checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.scss"],
	providers: getControlValueAccessorProviders(CheckboxComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends ControlValueAccessor<string> implements OnChanges {
	@Input() label = "";
	@Input() theme: ICheckboxTheme = "1";

	className = `app-checkbox ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<CheckboxComponent>) {
		if (changes.theme) {
			this.className = `app-checkbox ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
