import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { ICounterTheme } from "../interfaces";

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"],
	providers: getControlValueAccessorProviders(CounterComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent extends ControlValueAccessor<number> {
	@Input() label = "";
	@Input() theme: ICounterTheme = "1";

	constructor() {
		super(0);
	}

	get className() {
		return `app-counter ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}

	minus() {
		this.formControl.setValue(this.formControl.value - 1);
	}

	add() {
		this.formControl.setValue(this.formControl.value + 1);
	}
}
