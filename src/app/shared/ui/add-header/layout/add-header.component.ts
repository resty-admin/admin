import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-add-header",
	templateUrl: "./add-header.component.html",
	styleUrls: ["./add-header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHeaderComponent {
	@Output() clicked = new EventEmitter();

	@Input() title = "";
	@Input() add = "";

	emitAddClick() {
		this.clicked.emit();
	}
}
