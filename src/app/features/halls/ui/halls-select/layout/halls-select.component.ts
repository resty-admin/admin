import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import type { ISimpleChanges } from "@shared/interfaces";

import type { IHallToSelect } from "../interfaces";

@Component({
	selector: "app-halls-select",
	templateUrl: "./halls-select.component.html",
	styleUrls: ["./halls-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSelectComponent implements OnChanges {
	@Output() selectedHallsChange = new EventEmitter<string[]>();
	@Input() selectedHalls?: string[] | null;
	@Input() halls?: IHallToSelect[] | null;

	hallsWithSelected: (IHallToSelect & { selected: boolean })[] = [];

	isAll: boolean = false;

	constructor(private readonly _formBuilder: FormBuilder) {}

	toggleAll() {
		this.isAll = !this.isAll;

		this.hallsWithSelected = this.hallsWithSelected.map((hallWithSelected) => ({
			...hallWithSelected,
			selected: this.isAll
		}));

		this.emitChange();
	}

	ngOnChanges(changes: ISimpleChanges<HallsSelectComponent>) {
		if (!(changes.halls?.currentValue || changes.selectedHalls?.currentValue)) {
			return;
		}

		this.hallsWithSelected = (this.halls || []).map((hall) => ({
			...hall,
			selected: (this.selectedHalls || []).includes(hall.id)
		}));

		const selectedHalls = this.hallsWithSelected.filter((hall) => hall.selected).map((hall) => hall.id);

		this.isAll = selectedHalls.length === (this.halls || []).length;
	}

	trackByFn(index: number) {
		return index;
	}

	emitChange() {
		const selectedHalls = this.hallsWithSelected.filter((hall) => hall.selected).map((hall) => hall.id);

		this.isAll = selectedHalls.length === (this.halls || []).length;

		this.selectedHallsChange.emit(selectedHalls);
	}
}
