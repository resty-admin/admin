import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FORM } from "@shared/constants";

import { CORE_PAGE } from "../../constants";
import type { AdminPlacesQuery } from "../../graphql";

@Component({
	selector: "app-place-select",
	templateUrl: "./place-select.component.html",
	styleUrls: ["./place-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceSelectComponent {
	@Output() placeChanged = new EventEmitter<string>();
	@Output() addPlaceClicked = new EventEmitter();
	@Output() editPlaceClicked = new EventEmitter();
	@Output() deletePlaceClicked = new EventEmitter();
	@Input() places: AdminPlacesQuery["places"]["data"] = [];
	@Input() placeId?: string | null;
	readonly corePage = CORE_PAGE;
	readonly form = FORM;

	emitAddPlaceClick() {
		this.addPlaceClicked.emit();
	}

	emitPlaceChange(placeId: string) {
		this.placeChanged.emit(placeId);
	}

	emitEditClick(placeId: any) {
		this.editPlaceClicked.emit((this.places || []).find(({ id }) => id === placeId));
	}

	emitDeleteClick(placeId: any) {
		this.deletePlaceClicked.emit((this.places || []).find(({ id }) => id === placeId));
	}
}
