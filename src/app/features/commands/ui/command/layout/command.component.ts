import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { ICommand } from "../interfaces/command.interface";

@Component({
	selector: "app-command",
	templateUrl: "./command.component.html",
	styleUrls: ["./command.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandComponent {
	@Output() editClicked = new EventEmitter<ICommand>();
	@Output() deleteClicked = new EventEmitter<ICommand>();
	@Input() command?: ICommand;

	emitEditClick(command: ICommand) {
		this.editClicked.emit(command);
	}

	emitDeleteClick(command: ICommand) {
		this.deleteClicked.emit(command);
	}
}
