import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { ISimpleChanges } from "../../../../../shared/interfaces";

@UntilDestroy()
@Component({
	selector: "app-products-to-order-select",
	templateUrl: "./products-to-order-select.component.html",
	styleUrls: ["./products-to-order-select.component.scss"],
	providers: [getControlValueAccessorProviders(ProductsToOrderSelectComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsToOrderSelectComponent implements OnChanges, OnInit, ControlValueAccessor {
	@Input() productsToOrder?: any[] | null;

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	readonly formGroup = this._formBuilder.group({});

	constructor(private readonly _formBuilder: FormBuilder) {}

	ngOnChanges(changes: ISimpleChanges<ProductsToOrderSelectComponent>) {
		for (const productToOrder of changes.productsToOrder?.currentValue || []) {
			this.formGroup.addControl(productToOrder.id, new FormControl(false));
		}
	}

	ngOnInit() {
		this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			if (!this.onChange) {
				return;
			}

			this.onChange(value);
		});
	}

	trackByFn(index: number) {
		return index;
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.formGroup.errors;
	}

	writeValue(value: any): void {
		this.formGroup.patchValue(value, { emitValue: false });
	}
}
