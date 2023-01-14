import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { ISimpleChanges } from "../../../interfaces";
import { IRadioButtonTheme } from "../interfaces";
import type { IRadioButtonOption } from "../interfaces/radio-button-option.interface";

@Component({
	selector: "app-radio-button",
	templateUrl: "./radio-button.component.html",
	styleUrls: ["./radio-button.component.scss"],
	providers: getControlValueAccessorProviders(RadioButtonComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends ControlValueAccessor<boolean> implements OnChanges {
	@Input() theme: IRadioButtonTheme = "1";
	@Input() options?: IRadioButtonOption[] = [];

	className = `app-radio-button ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<RadioButtonComponent>) {
		if (changes.theme) {
			this.className = `app-radio-button ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}

	trackByFn(index: number) {
		return index;
	}
}
