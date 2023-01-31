import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { SharedService } from "@shared/services";

import type { ITab } from "../interfaces";

@Component({
	selector: "app-tabs",
	templateUrl: "./tabs.component.html",
	styleUrls: ["./tabs.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
	@Input() tabs: ITab[] = [];

	constructor(readonly sharedService: SharedService) {}
}
