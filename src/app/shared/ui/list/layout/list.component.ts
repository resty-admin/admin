import type { TemplateRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedService } from "@shared/services";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent<T extends { id: string }> {
	@Output() clicked = new EventEmitter<T>();
	@Input() items?: T[] | null = [];
	@Input() itemTemplate: TemplateRef<unknown> | null = null;

	@Input() type: "button" | "link" = "button";

	constructor(readonly sharedService: SharedService) {}

	emitClick(item: T) {
		this.clicked.emit(item);
	}
}
