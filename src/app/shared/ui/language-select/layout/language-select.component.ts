import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { ILanguageSelectTheme } from "../interfaces";

@Component({
	selector: "app-language-select",
	templateUrl: "./language-select.component.html",
	styleUrls: ["./language-select.component.scss"],
	providers: getControlValueAccessorProviders(LanguageSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectComponent extends ControlValueAccessor<boolean> {
	@Input() label = "";
	@Input() theme: ILanguageSelectTheme = "1";

	readonly languages = ["RU", "UK"];

	get className() {
		return `app-language-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
