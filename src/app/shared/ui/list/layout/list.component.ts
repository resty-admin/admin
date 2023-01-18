import type { TemplateRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { IListItem } from "../interfaces";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
	@Output() clicked = new EventEmitter<unknown>();
	@Input() items?: IListItem[] | null = [];
	@Input() itemTemplate: TemplateRef<unknown> | null = null;

	@Input() type: "button" | "link" = "button";

	trackByFn(index: number) {
		return index;
	}

	emitClick(item: unknown) {
		this.clicked.emit(item);
	}
}
