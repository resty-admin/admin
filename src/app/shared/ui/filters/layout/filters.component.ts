import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-filters",
	templateUrl: "./filters.component.html",
	styleUrls: ["./filters.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {}
