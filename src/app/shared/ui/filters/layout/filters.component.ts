import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM_I18N } from "@core/constants";

@Component({
	selector: "app-filters",
	templateUrl: "./filters.component.html",
	styleUrls: ["./filters.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
	readonly formI18n = FORM_I18N;
}
