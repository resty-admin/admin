import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-attribute",
	templateUrl: "./attribute.component.html",
	styleUrls: ["./attribute.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeComponent {}
