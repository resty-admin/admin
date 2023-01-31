import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedService } from "@shared/services";

import { CORE_PAGE } from "../../constants";
import type { IAsidePage } from "../../interfaces";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
	readonly corePage = CORE_PAGE;
	@Input() pages: IAsidePage[] | null = [];
	@Output() closeClicked = new EventEmitter();

	constructor(readonly sharedService: SharedService) {}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
