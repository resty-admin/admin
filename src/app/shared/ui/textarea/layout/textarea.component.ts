import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { ITextareaTheme } from "../interfaces";

@Component({
	selector: "app-textarea",
	templateUrl: "./textarea.component.html",
	styleUrls: ["./textarea.component.scss"],
	providers: getControlValueAccessorProviders(TextareaComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends ControlValueAccessor<string> {
	@Input() label = "";
	@Input() theme: ITextareaTheme = "1";

	get className() {
		return `app-textarea ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
