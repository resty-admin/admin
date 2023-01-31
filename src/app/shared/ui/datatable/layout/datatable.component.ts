import type { OnChanges } from "@angular/core";
import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	Inject,
	Input,
	Output,
	QueryList
} from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import { ColumnDirective } from "@shared/ui/datatable/directives";
import { ColumnMode } from "@swimlane/ngx-datatable";

import { DATATABLE_CONFIG } from "../injection-tokens";
import type { IDatatableRow } from "../interfaces";
import { IDatatableConfig, IDatatableTheme } from "../interfaces";

@Component({
	selector: "app-datatable",
	templateUrl: "./datatable.component.html",
	styleUrls: ["./datatable.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnChanges {
	@ContentChildren(ColumnDirective) appColumns!: QueryList<ColumnDirective>;

	@Output() clicked = new EventEmitter();
	@Output() mouseEntered = new EventEmitter();
	@Output() doubleClicked = new EventEmitter();
	@Output() activated = new EventEmitter();
	@Input() theme: IDatatableTheme = "1";
	@Input() rows?: IDatatableRow<unknown>[] | null;

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
