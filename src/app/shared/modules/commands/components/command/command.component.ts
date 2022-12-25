import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-command",
	templateUrl: "./command.component.html",
	styleUrls: ["./command.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandComponent {}
