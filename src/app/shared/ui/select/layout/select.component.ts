import type { OnChanges, OnInit } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, ContentChild, Input } from "@angular/core";
import { isArray } from "@apollo/client/cache/inmemory/helpers";
import type { AddTagFn } from "@ng-select/ng-select/lib/ng-select.component";
import { CompareWithFn } from "@ng-select/ng-select/lib/ng-select.component";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { ISimpleChanges } from "../../../interfaces";
import { ISelectTheme } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
	providers: getControlValueAccessorProviders(SelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends ControlValueAccessor<any> implements OnInit, OnChanges {
	@ContentChild("selectLabelTemplate", { static: true }) selectLabelTemplate?: TemplateRef<unknown>;
	@ContentChild("selectOptionTemplate", { static: true }) selectOptionTemplate?: TemplateRef<unknown>;

	@Input() multiple = false;
	@Input() label = "";
	@Input() theme: ISelectTheme = "1";
	@Input() clearable = false;
	@Input() searchable = false;
	@Input() addTag: AddTagFn | boolean = false;
	@Input() bindLabel = "label";
	@Input() bindValue = "value";
	@Input() options?: any[] | null = [];
	@Input() compareWith: CompareWithFn = (a, b) => (this.bindValue ? a[this.bindValue] === b : a === b);

	constructor() {
		super(null);
	}

	override ngOnInit() {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			const id = typeof value === "string" ? value : value?.id;
			const returnValue = this.options?.find((option) => option.id === id);

			if (this.onChange) {
				this.onChange(returnValue);
			}

			this.valueChange.emit(returnValue);
		});
	}

	override ngOnChanges(changes: ISimpleChanges<SelectComponent>) {
		if (changes.options && changes.options.currentValue) {
			this.formControl.setValue(this.formControl.value);
		}

		super.ngOnChanges(changes);
	}

	get hasValue() {
		return isArray(this.formControl.value) ? this.formControl.value.length : this.formControl.value;
	}

	get messages() {
		return {
			addTagText: "Добавить: ",
			notFoundText: "Не найдено"
		};
	}

	get className() {
		return `app-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}

	get items() {
		return this.options || [];
	}
}
