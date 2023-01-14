import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import type { ISimpleChanges } from "../../../interfaces";
import { DATATABLE_CONFIG } from "../injection-tokens";
import type { IDatatableColumn, IDatatableRow } from "../interfaces";
import { IDatatableConfig, IDatatableTheme } from "../interfaces";

@Component({
	selector: "app-datatable",
	templateUrl: "./datatable.component.html",
	styleUrls: ["./datatable.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnChanges {
	@Output() clicked = new EventEmitter();
	@Output() mouseEntered = new EventEmitter();
	@Output() doubleClicked = new EventEmitter();
	@Output() activated = new EventEmitter();
	@Input() theme: IDatatableTheme = "1";
	@Input() columns: IDatatableColumn[] = [];
	@Input() rows: IDatatableRow<unknown>[] = [];

	readonly columnMode = ColumnMode;

	className = `app-datatable ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	readonly messages = this._datatableConfig.messages;

	constructor(@Inject(DATATABLE_CONFIG) private readonly _datatableConfig: IDatatableConfig) {}

	ngOnChanges(changes: ISimpleChanges<DatatableComponent>) {
		if (changes.theme) {
			this.className = `app-datatable ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}
	}

	emitActivate(event: { type: "click" | "dblclick" | "mouseenter"; row: unknown }) {
		({
			click: this.clicked,
			dblclick: this.doubleClicked,
			mouseenter: this.mouseEntered
		}[event.type].emit(event.row));

		this.activated.emit(event);
	}
}
