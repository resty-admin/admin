import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ILinkTheme } from "../interfaces";

@Component({
	selector: "app-link",
	templateUrl: "./link.component.html",
	styleUrls: ["./link.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
	@Input() label = "";
	@Input() theme: ILinkTheme = "1";
	@Input() disabled = false;
	@Input() link = "";
}
