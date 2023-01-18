import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ICommand } from "../interfaces/command.interface";

@Component({
	selector: "app-command",
	templateUrl: "./command.component.html",
	styleUrls: ["./command.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandComponent {
	@Input() command?: ICommand;
	@Input() actions: any;
}
