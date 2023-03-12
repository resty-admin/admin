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
import type { IPageInfo } from "@shared/ui/pager";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";

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

	@Output() pageChanged = new EventEmitter<IPageInfo>();
	@Output() clicked = new EventEmitter();
	@Output() mouseEntered = new EventEmitter();
	@Output() doubleClicked = new EventEmitter();
	@Output() activated = new EventEmitter();
	@Output() selectChange = new EventEmitter<unknown>();
	@Input() theme: IDatatableTheme = "1";
	@Input() rows?: IDatatableRow<unknown>[] | null;
	@Input() selected: unknown[] = [];
	@Input() selectionType: SelectionType = SelectionType.single;
	@Input() count = 0;
	@Input() offset = 0;
	@Input() limit?: number;

	@Input() externalPaging: boolean = true;

	_selected: unknown[] = [];

	readonly columnMode = ColumnMode;

	className = `app-datatable ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	readonly messages = this._datatableConfig.messages;

	constructor(@Inject(DATATABLE_CONFIG) private readonly _datatableConfig: IDatatableConfig) {}

	ngOnChanges(changes: ISimpleChanges<DatatableComponent>) {
		if (changes.theme) {
			this.className = `app-datatable ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.selected || changes.rows) {
			const selectedIds = new Set((this.selected || []).map((selected: any) => selected.id));
			this._selected = (this.rows || []).filter((row: any) => selectedIds.has(row.id));
		}
	}

	emitSelect(event: unknown) {
		this.selectChange.emit(event);
	}

	emitActivate(event: { type: "click" | "dblclick" | "mouseenter"; row: unknown }) {
		({
			click: this.clicked,
			dblclick: this.doubleClicked,
			mouseenter: this.mouseEntered
		})[event.type].emit(event.row);

		this.activated.emit(event);
	}

	emitPage(page: IPageInfo) {
		this.pageChanged.emit(page);
	}
}
