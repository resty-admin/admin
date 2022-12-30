import { ChangeDetectionStrategy, Component } from "@angular/core";

import { PlacesService } from "../../../../../../../../features/places";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent {
	places$ = this._placesService.places$;

	constructor(private readonly _placesService: PlacesService) {}

	openAddPlaceDialog() {
		this._placesService.openCreateOrUpdatePlaceDialog().subscribe();
	}
}
