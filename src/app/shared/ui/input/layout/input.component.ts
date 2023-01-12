import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { ControlValueAccessor } from "src/app/shared/classes";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { getControlValueAccessorProviders } from "../../../functions";
import { IInputTheme, IInputType, IReturnType } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
	providers: getControlValueAccessorProviders(InputComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends ControlValueAccessor<number | string> implements OnInit {
	@Input() label = "";
	@Input() theme: IInputTheme = "1";
	@Input() type: IInputType = "input";
	@Input() returnType: IReturnType = "string";

	override ngOnInit() {
		this.formControl.valueChanges
			.pipe(
				untilDestroyed(this),
				map((value) =>
					this.returnType === "string"
						? String(value)
						: this.returnType === "number"
						? Number.parseInt(value?.toString())
						: this.returnType === "float"
						? Number.parseFloat(value?.toString())
						: value
				)
			)
			.subscribe((value) => {
				if (this.onChange) {
					this.onChange(value);
				}

				this.valueChange.emit(value);
			});
	}

	get className() {
		return `app-input ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
