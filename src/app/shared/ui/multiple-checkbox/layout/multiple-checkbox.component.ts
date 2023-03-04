import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { untilDestroyed } from "@ngneat/until-destroy";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import { IMultipleCheckboxTheme } from "../interfaces";

@Component({
	selector: "app-multiple-checkbox",
	templateUrl: "./multiple-checkbox.component.html",
	styleUrls: ["./multiple-checkbox.component.scss"],
	providers: getControlValueAccessorProviders(MultipleCheckboxComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleCheckboxComponent extends ControlValueAccessor<string[]> implements OnChanges, OnInit {
	@ContentChild("labelTemplate", { static: true }) labelTemplate?: TemplateRef<unknown>;

	@Input() label = "";
	@Input() theme: IMultipleCheckboxTheme = "1";
	@Input() options?: any[] | null = [];

	@Input() bindValue = "value";
	@Input() bindLabel = "label";

	className = `app-multiple-checkbox ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	formGroup = new FormGroup({});

	constructor(readonly sharedService: SharedService) {
		super([]);
	}

	override ngOnInit() {
		this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			const values = Object.entries(value)
				.filter(([_, value]) => value)
				.map(([id]) => id);

			if (this.onChange) {
				this.onChange(values);
			}

			this.valueChange.emit(values);
		});
	}

	override ngOnChanges(changes: ISimpleChanges<MultipleCheckboxComponent>) {
		if (changes.theme) {
			this.className = `app-multiple-checkbox ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.options) {
			for (const option of changes.options.currentValue || []) {
				this.formGroup.addControl(option[this.bindValue], new FormControl(false));
			}
		}

		super.ngOnChanges(changes);
	}

	override setDisabledState(isDisabled: boolean) {
		super.setDisabledState(isDisabled);

		if (isDisabled) {
			this.formGroup.disable();
		} else {
			this.formGroup.enable();
		}
	}

	override writeValue(value: string[]) {
		this.formGroup.patchValue(
			(value || []).reduce((pre, curr) => ({ ...pre, [curr]: true }), {}),
			{ emitEvent: false }
		);

		super.writeValue(value);
	}
}
