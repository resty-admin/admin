import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";

import { ICodeInputTheme } from "../interfaces";

@Component({
	selector: "app-code-input",
	templateUrl: "./code-input.component.html",
	styleUrls: ["./code-input.component.scss"],
	providers: getControlValueAccessorProviders(CodeInputComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeInputComponent extends ControlValueAccessor<number> implements OnChanges {
	@Output() codeChanged = new EventEmitter<number>();
	@Output() codeCompleted = new EventEmitter<number>();

	@Input() label = "";
	@Input() theme: ICodeInputTheme = "1";

	@Input() inputType = "tel";
	@Input() isCodeHidden = false;
	@Input() isCharsCode = false;
	@Input() isPrevFocusableAfterClearing = true;
	@Input() isFocusingOnLastByClickIfFilled = false;
	@Input() initialFocusField = 0;
	@Input() code = "";
	@Input() autocapitalize = "";
	@Input() codeLength = 4;

	className = `app-code-input ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	override ngOnChanges(changes: ISimpleChanges<CodeInputComponent>) {
		if (changes.theme) {
			this.className = `app-code-input ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}

	emitCodeChange(code: string) {
		const codeNumber = Number(code);
		this.codeChanged.emit(codeNumber);
		this.formControl.setValue(codeNumber);
	}

	emitCodeComplete(code: string) {
		const codeNumber = Number(code);
		this.codeCompleted.emit(codeNumber);
		this.formControl.setValue(codeNumber);
	}
}
