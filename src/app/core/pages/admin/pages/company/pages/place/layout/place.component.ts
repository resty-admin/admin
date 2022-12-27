import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "app-place",
	templateUrl: "./place.component.html",
	styleUrls: ["./place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent {}
