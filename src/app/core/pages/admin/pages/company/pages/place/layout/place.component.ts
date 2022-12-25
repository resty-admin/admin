import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { switchMap, take, tap } from "rxjs";

import { PLACE_ID } from "../../../../../../../../shared/constants";
import { PlacesService } from "../../../../../../../../shared/modules/places";
import { AsideService } from "../../../../../services/aside/aside.service";

@UntilDestroy()
@Component({
	selector: "app-place",
	templateUrl: "./place.component.html",
	styleUrls: ["./place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent implements OnInit {
	constructor(
		private readonly _placesService: PlacesService,
		private readonly _asideService: AsideService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this._activatedRoute.paramMap
			.pipe(
				untilDestroyed(this),
				tap((paramMap) => {
					this._asideService.activePlaceIdSubject.next(paramMap.get(PLACE_ID.slice(1)) || "");
				}),
				switchMap(() => this._placesService.places$),
				take(1)
			)
			.subscribe((places) => {
				this._asideService.placesBehaviourSubject.next(places);
			});
	}
}
