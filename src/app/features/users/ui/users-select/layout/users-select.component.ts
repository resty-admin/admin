import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { pairwise } from "rxjs";

import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { ISimpleChanges } from "../../../../../shared/interfaces";
import { USERS_SELECT_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-users-select",
	templateUrl: "./users-select.component.html",
	styleUrls: ["./users-select.component.scss"],
	providers: getControlValueAccessorProviders(UsersSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
	readonly usersSelectI18n = USERS_SELECT_I18N;
	@Input() users?: any[] | null = [];

	readonly usersGroup = this._formBuilder.group({ all: false });

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	trackByFn(index: number) {
		return index;
	}

	constructor(private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		let isProgrammatic = false;

		this.usersGroup.value$.pipe(untilDestroyed(this), pairwise()).subscribe(([oldUsers, currUsers]) => {
			if (isProgrammatic) {
				isProgrammatic = false;
				return;
			}

			const { all, ...usersMap } = currUsers;
			const isAllChecked = Object.values(usersMap).every((isChecked) => isChecked);

			if (all !== isAllChecked) {
				isProgrammatic = true;
				this.usersGroup.patchValue({ all: isAllChecked });
			}

			if (all !== oldUsers.all) {
				const allCheckedUsers = Object.keys(usersMap).reduce((prev, id) => ({ ...prev, [id]: all }), { all });
				this.usersGroup.patchValue(allCheckedUsers);
				return;
			}

			const usersToReturn = Object.entries(usersMap)
				.filter(([_, value]) => value)
				.map(([key]) => key);

			if (!this.onChange) {
				return;
			}

			this.onChange(usersToReturn);
		});
	}

	ngOnChanges(changes: ISimpleChanges<UsersSelectComponent>) {
		if (!changes.users || !changes.users.currentValue) {
			return;
		}

		for (const user of changes.users.currentValue) {
			this.usersGroup.addControl(user.id, new FormControl(false));
		}
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.usersGroup.errors;
	}

	writeValue(value: any): void {
		this.usersGroup.patchValue(value, { emitValue: false });
	}
}
