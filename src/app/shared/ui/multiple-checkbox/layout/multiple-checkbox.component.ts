import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import type { IMultipleCheckboxOption } from "../interfaces";
import { IMultipleCheckboxTheme } from "../interfaces";

@Component({
	selector: "app-multiple-checkbox",
	templateUrl: "./multiple-checkbox.component.html",
	styleUrls: ["./multiple-checkbox.component.scss"],
	providers: getControlValueAccessorProviders(MultipleCheckboxComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleCheckboxComponent extends ControlValueAccessor<string> implements OnChanges {
	@Input() label = "";
	@Input() theme: IMultipleCheckboxTheme = "1";
	@Input() options: IMultipleCheckboxOption[] = [];

	className = `app-multiple-checkbox ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	constructor(readonly sharedService: SharedService) {
		super("");
	}

	override ngOnChanges(changes: ISimpleChanges<MultipleCheckboxComponent>) {
		if (changes.theme) {
			this.className = `app-multiple-checkbox ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
