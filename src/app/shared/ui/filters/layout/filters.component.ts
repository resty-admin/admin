import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ControlValueAccessor } from "src/app/shared/classes";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

@Component({
	selector: "app-filters",
	templateUrl: "./filters.component.html",
	styleUrls: ["./filters.component.scss"],
	providers: getControlValueAccessorProviders(FiltersComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent extends ControlValueAccessor<string> {}
