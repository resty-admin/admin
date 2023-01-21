import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";

import { ILanguageSelectTheme } from "../interfaces";

@Component({
	selector: "app-language-select",
	templateUrl: "./language-select.component.html",
	styleUrls: ["./language-select.component.scss"],
	providers: getControlValueAccessorProviders(LanguageSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectComponent extends ControlValueAccessor<boolean> implements OnChanges {
	@Input() label = "";
	@Input() theme: ILanguageSelectTheme = "1";

	readonly languages = ["RU", "UK"];

	className = `app-language-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<LanguageSelectComponent>) {
		if (changes.theme) {
			this.className = `app-language-select ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
