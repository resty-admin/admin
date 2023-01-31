import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { SharedService } from "@shared/services";

import type { ITab } from "../interfaces";

@Component({
	selector: "app-tabs",
	templateUrl: "./tabs.component.html",
	styleUrls: ["./tabs.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
	@ContentChild("labelTemplate", { static: true }) labelTemplate?: TemplateRef<unknown>;

	@Input() tabs: ITab[] = [];

	constructor(readonly sharedService: SharedService) {}
}
