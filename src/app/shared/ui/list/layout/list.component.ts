import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
	@Output() clicked = new EventEmitter<any>();
	@Input() items?: any[] | null = [];
	@Input() itemTemplate: any;

	@Input() type: "button" | "link" = "button";

	trackByFn(index: number) {
		return index;
	}

	emitClick(item: any) {
		this.clicked.emit(item);
	}
}
