import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { IButtonTheme } from "../interfaces";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
	@Output() clicked = new EventEmitter<MouseEvent>();

	@Input() label = "";
	@Input() theme: IButtonTheme = "1";
	@Input() disabled = false;

	emitClick(event: MouseEvent) {
		this.clicked.emit(event);
	}
}
