import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { IInputTheme, IInputType } from "../interfaces";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends ControlValueAccessor<string> {
	@Input() label = "";
	@Input() theme: IInputTheme = "1";
	@Input() type: IInputType = "input";

	get className() {
		return `app-input ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
