import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM } from "@shared/constants";

@Component({
	selector: "app-filters",
	templateUrl: "./filters.component.html",
	styleUrls: ["./filters.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
	readonly form = FORM;
}
