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
import type { IUserToSelect } from "../interfaces";
import type { IUsersSelectForm } from "../interfaces";

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
	@Input() users?: IUserToSelect[] | null = [];

	readonly usersGroup = this._formBuilder.group<IUsersSelectForm>({ all: false });

	onChange?: (value: Omit<IUsersSelectForm, "all">) => void;
	onTouched?: () => void;

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

			if (!this.onChange) {
				return;
			}

			this.onChange(usersMap);
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

	registerOnChange(onChange: (value: Omit<IUsersSelectForm, "all">) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.usersGroup.errors;
	}

	writeValue(value: Omit<IUsersSelectForm, "all">): void {
		this.usersGroup.patchValue(value, { emitValue: false });
	}
}
