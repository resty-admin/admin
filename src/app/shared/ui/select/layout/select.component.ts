import type { OnChanges, OnInit } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, ContentChild, Input } from "@angular/core";
import { isArray } from "@apollo/client/cache/inmemory/helpers";
import type { AddTagFn } from "@ng-select/ng-select/lib/ng-select.component";
import { CompareWithFn } from "@ng-select/ng-select/lib/ng-select.component";
import { ControlValueAccessor } from "@shared/classes";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";
import { map } from "rxjs";

import { ISelectTheme } from "../interfaces";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
	providers: getControlValueAccessorProviders(SelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends ControlValueAccessor<string> implements OnChanges, OnInit {
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
	@Input() options?: unknown[] | null = [];
	@Input() compareWith: CompareWithFn = (a, b) => (this.bindValue ? a[this.bindValue] === b : a === b);

	readonly messages = {
		addTagText: "Добавить: ",
		notFoundText: "Не найдено"
	};

	className = `app-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	readonly hasValue$ = this.formControl.valueChanges.pipe(map((value) => (isArray(value) ? value.length : value)));

	constructor() {
		super("");
	}

	override ngOnChanges(changes: ISimpleChanges<SelectComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-select ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
