import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";
import type { IRadioButtonOption } from "@shared/ui/radio-button";

import { IRadioButtonTheme } from "../interfaces";

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

	constructor(readonly sharedService: SharedService) {
		super(false);
	}

	override ngOnChanges(changes: ISimpleChanges<RadioButtonComponent>) {
		if (changes.theme) {
			this.className = `app-radio-button ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
