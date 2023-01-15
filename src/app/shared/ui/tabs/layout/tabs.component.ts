import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-tabs",
	templateUrl: "./tabs.component.html",
	styleUrls: ["./tabs.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
	@Input() tabs: any[] = [];

	trackByFn(index: number) {
		return index;
	}
}
