import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IAsidePage } from "@shared/interfaces";
import { SharedService } from "@shared/services";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
	@Input() pages: IAsidePage[] | null = [];
	@Output() closeClicked = new EventEmitter();

	constructor(readonly sharedService: SharedService) {}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
