import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";

import type { IPageInfo } from "../interfaces";
import { IPaginatorTheme } from "../interfaces";

function getPaginationNumbers(page: number, totalCount: number): number[] {
	const itemsPerPage = 5;
	const totalPages = Math.ceil(totalCount / itemsPerPage);
	const paginationNumbers = [];

	page = Math.max(page, 0);

	if (totalPages <= 5) {
		for (let i = 0; i < totalPages; i++) {
			paginationNumbers.push(i);
		}
	} else {
		const half = Math.floor(5 / 2);
		const offset = Math.max(page - half, 0);
		let start = offset;
		let end = Math.min(offset + 5, totalPages);

		if (end - start < 5) {
			end = Math.min(start + 5, totalPages);
			start = Math.max(end - 5, 0);
		}

		for (let i = start; i < end; i++) {
			paginationNumbers.push(i);
		}
	}

	return paginationNumbers;
}
@Component({
	selector: "app-pager",
	templateUrl: "./pager.component.html",
	styleUrls: ["./pager.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnChanges {
	@Output() pageChanged = new EventEmitter<IPageInfo>();
	@Input() theme: IPaginatorTheme = "1";
	@Input() count: number = 0;
	@Input() offset: number = 0;
	@Input() limit: number = 0;

	className = `app-paginator ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	pages: number[] = [];

	setClassName(args?: { theme?: string; count?: number }) {
		this.className = `app-paginator ${THEME.replace(ANY_SYMBOL, args?.theme || this.theme)}`;
	}

	ngOnChanges(changes: ISimpleChanges<PagerComponent>) {
		if (changes.theme) {
			this.setClassName({ theme: changes.theme.currentValue });
		}

		if (changes.offset || changes.count) {
			this.pages = this.count > this.limit ? getPaginationNumbers(this.offset, this.count) : [];
		}
	}

	emitPageChanged(offset: number) {
		this.pageChanged.emit({
			count: this.count,
			limit: this.limit,
			offset,
			pageSize: this.limit
		});
	}
}
