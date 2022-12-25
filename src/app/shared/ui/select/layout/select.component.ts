import { TemplateRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, ContentChild, Input } from "@angular/core";
import type { AddTagFn } from "@ng-select/ng-select/lib/ng-select.component";
import { CompareWithFn } from "@ng-select/ng-select/lib/ng-select.component";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

import { ISelectTheme } from "../interfaces";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
	providers: getControlValueAccessorProviders(SelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends ControlValueAccessor<any> {
	@ContentChild("selectLabelTemplate", { static: true }) selectLabelTemplate?: TemplateRef<unknown>;
	@ContentChild("selectOptionTemplate", { static: true }) selectOptionTemplate?: TemplateRef<unknown>;

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

	get messages() {
		return {} as any;
	}

	get className() {
		return `app-select ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}

	get items() {
		return this.options || [];
	}
}
