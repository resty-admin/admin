import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { IHall } from "../interfaces/hall.interface";

@Component({
	selector: "app-hall",
	templateUrl: "./hall.component.html",
	styleUrls: ["./hall.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallComponent {
	@Output() editClicked = new EventEmitter<IHall>();
	@Output() deleteClicked = new EventEmitter<IHall>();
	@Input() hall?: IHall;

	emitEditClick(hall: IHall) {
		this.editClicked.emit(hall);
	}

	emitDeleteClick(hall: IHall) {
		this.deleteClicked.emit(hall);
	}
}
