import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { HALLS_SELECT } from "@features/halls/ui/halls-select/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import type { IHallToSelect } from "../interfaces";

@Component({
	selector: "app-halls-select",
	templateUrl: "./halls-select.component.html",
	styleUrls: ["./halls-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSelectComponent implements OnChanges {
	readonly hallsSelect = HALLS_SELECT;
	@Output() selectedHallsChange = new EventEmitter<string[]>();
	@Input() selectedHalls?: string[] | null;
	@Input() halls?: IHallToSelect[] | null;

	hallsWithSelected: (IHallToSelect & { selected: boolean })[] = [];

	isAll: boolean = false;

	constructor(readonly sharedService: SharedService) {}

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

	emitChange() {
		const selectedHalls = this.hallsWithSelected.filter((hall) => hall.selected).map((hall) => hall.id);

		this.isAll = selectedHalls.length === (this.halls || []).length;

		this.selectedHallsChange.emit(selectedHalls);
	}
}
