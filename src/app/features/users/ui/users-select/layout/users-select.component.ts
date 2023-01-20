import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { ISimpleChanges } from "../../../../../shared/interfaces";
import type { IUserToSelect } from "../interfaces";

@Component({
	selector: "app-users-select",
	templateUrl: "./users-select.component.html",
	styleUrls: ["./users-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSelectComponent implements OnChanges {
	@Output() selectedUsersChange = new EventEmitter<string[]>();
	@Input() selectedUsers?: string[] | null;
	@Input() users?: IUserToSelect[] | null;

	usersWithSelected: (IUserToSelect & { selected: boolean })[] = [];

	isAll: boolean = false;

	toggleAll() {
		this.isAll = !this.isAll;

		this.usersWithSelected = this.usersWithSelected.map((userWithSelected) => ({
			...userWithSelected,
			selected: this.isAll
		}));

		this.emitChange();
	}

	ngOnChanges(changes: ISimpleChanges<UsersSelectComponent>) {
		if (!(changes.users?.currentValue || changes.selectedUsers?.currentValue)) {
			return;
		}

		this.usersWithSelected = (this.users || []).map((user) => ({
			...user,
			selected: (this.selectedUsers || []).includes(user.id)
		}));

		const selectedusers = this.usersWithSelected.filter((user) => user.selected).map((user) => user.id);

		this.isAll = selectedusers.length === (this.users || []).length;
	}

	trackByFn(index: number) {
		return index;
	}

	emitChange() {
		const selectedusers = this.usersWithSelected.filter((user) => user.selected).map((user) => user.id);

		this.isAll = selectedusers.length === (this.users || []).length;

		this.selectedUsersChange.emit(selectedusers);
	}
}
