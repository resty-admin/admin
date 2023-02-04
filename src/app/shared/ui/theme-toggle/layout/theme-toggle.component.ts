import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { ThemeEnum } from "@shared/enums";
import type { ISimpleChanges } from "@shared/interfaces";

import { IThemeToggleTheme } from "../interfaces";

@Component({
	selector: "app-theme-toggle",
	templateUrl: "./theme-toggle.component.html",
	styleUrls: ["./theme-toggle.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent implements OnChanges {
	@Output() valueChange = new EventEmitter<ThemeEnum>();
	@Input() label = "";
	@Input() theme: IThemeToggleTheme = "1";
	@Input() value?: ThemeEnum | null;

	checkboxValue = false;

	className = `app-theme-toggle ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	ngOnChanges(changes: ISimpleChanges<ThemeToggleComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-theme-toggle ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.value) {
			this.checkboxValue = changes.value.currentValue === ThemeEnum.LIGHT;
		}
	}

	emitValueChange(event: Event) {
		const { checked } = event.target as HTMLInputElement;

		this.valueChange.emit(checked ? ThemeEnum.LIGHT : ThemeEnum.DARK);
	}
}
