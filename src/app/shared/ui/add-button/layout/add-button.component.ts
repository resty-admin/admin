import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IButtonTheme } from "@shared/ui/button";

@Component({
	selector: "app-add-button",
	templateUrl: "./add-button.component.html",
	styleUrls: ["./add-button.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddButtonComponent {
	@Output() clicked = new EventEmitter<MouseEvent>();

	@Input() label = "";
	@Input() theme: IButtonTheme = "1";
	@Input() disabled = false;

	emitClick(event: MouseEvent) {
		this.clicked.emit(event);
	}
}
