import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { getControlValueAccessorProviders } from "../../../functions";
import { IInputTheme, IInputType } from "../interfaces";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
	providers: getControlValueAccessorProviders(InputComponent),
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
