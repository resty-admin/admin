import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	@Output() burgerClicked = new EventEmitter();

	@Input() user: any;
	@Input() isAsideOpen: any;
	@Input() profileActions: any;

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
