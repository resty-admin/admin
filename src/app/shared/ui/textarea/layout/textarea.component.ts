import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";

import { ITextareaTheme } from "../interfaces";

@Component({
	selector: "app-textarea",
	templateUrl: "./textarea.component.html",
	styleUrls: ["./textarea.component.scss"],
	providers: getControlValueAccessorProviders(TextareaComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends ControlValueAccessor<string> implements OnChanges {
	@Input() label = "";
	@Input() theme: ITextareaTheme = "1";

	className = `app-textarea ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<TextareaComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-textarea ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
