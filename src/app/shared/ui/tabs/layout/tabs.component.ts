import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { ITab } from "../interfaces";

@Component({
	selector: "app-tabs",
	templateUrl: "./tabs.component.html",
	styleUrls: ["./tabs.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
	@Input() tabs: ITab[] = [];

	trackByFn(index: number) {
		return index;
	}
}
