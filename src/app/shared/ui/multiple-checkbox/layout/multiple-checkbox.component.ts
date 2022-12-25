import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { IMultipleCheckboxOption } from "../interfaces";
import { IMultipleCheckboxTheme } from "../interfaces";

@Component({
	selector: "app-multiple-checkbox",
	templateUrl: "./multiple-checkbox.component.html",
	styleUrls: ["./multiple-checkbox.component.scss"],
	providers: getControlValueAccessorProviders(MultipleCheckboxComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleCheckboxComponent extends ControlValueAccessor<string> {
	@Input() label = "";
	@Input() theme: IMultipleCheckboxTheme = "1";
	@Input() options: IMultipleCheckboxOption[] = [];

	get className() {
		return `app-multiple-checkbox ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
