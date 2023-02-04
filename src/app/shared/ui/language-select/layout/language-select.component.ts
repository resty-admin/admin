import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { LanguagesEnum } from "@shared/enums";
import type { ISimpleChanges } from "@shared/interfaces";

import { ILanguageSelectTheme } from "../interfaces";

@Component({
	selector: "app-language-select",
	templateUrl: "./language-select.component.html",
	styleUrls: ["./language-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectComponent implements OnChanges {
	@Output() valueChange = new EventEmitter<LanguagesEnum>();
	@Input() label = "";
	@Input() theme: ILanguageSelectTheme = "1";

	@Input() value?: LanguagesEnum | null;

	readonly languages = [
		{ value: LanguagesEnum.RU, label: "RU" },
		{ value: LanguagesEnum.UK, label: "UK" },
		{ value: LanguagesEnum.EN, label: "EN" }
	];

	className = `app-language-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	ngOnChanges(changes: ISimpleChanges<LanguageSelectComponent>) {
		if (changes.theme) {
			this.className = `app-language-select ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}
	}

	emitValueChange(language: string) {
		this.valueChange.emit(language as LanguagesEnum);
	}
}
