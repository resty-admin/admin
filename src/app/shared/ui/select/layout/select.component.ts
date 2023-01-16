import type { OnChanges, OnInit } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, ContentChild, Input } from "@angular/core";
import { isArray } from "@apollo/client/cache/inmemory/helpers";
import type { AddTagFn } from "@ng-select/ng-select/lib/ng-select.component";
import { CompareWithFn } from "@ng-select/ng-select/lib/ng-select.component";
import { map } from "rxjs";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import type { ISimpleChanges } from "../../../interfaces";
import { ISelectTheme } from "../interfaces";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
	providers: getControlValueAccessorProviders(SelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends ControlValueAccessor<any> implements OnChanges, OnInit {
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

	readonly messages = {
		addTagText: "Добавить: ",
		notFoundText: "Не найдено"
	};

	className = `app-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	readonly hasValue$ = this.formControl.valueChanges.pipe(map((value) => (isArray(value) ? value.length : value)));

	constructor() {
		super(null);
	}

	override ngOnChanges(changes: ISimpleChanges<SelectComponent>) {
		if (changes.theme && changes.theme.currentValue) {
			this.className = `app-select ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		super.ngOnChanges(changes);
	}
}
