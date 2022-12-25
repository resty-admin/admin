import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { IRadioButtonTheme } from "../interfaces";
import type { IRadioButtonOption } from "../interfaces/radio-button-option.interface";

@Component({
	selector: "app-radio-button",
	templateUrl: "./radio-button.component.html",
	styleUrls: ["./radio-button.component.scss"],
	providers: getControlValueAccessorProviders(RadioButtonComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends ControlValueAccessor<boolean> {
	@Input() theme: IRadioButtonTheme = "1";
	@Input() options: IRadioButtonOption[] = [];

	trackByFn(index: number) {
		return index;
	}

	get className() {
		return `app-radio-button ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
