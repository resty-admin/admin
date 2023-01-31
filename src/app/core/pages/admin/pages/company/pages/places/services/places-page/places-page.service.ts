import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesPageService {
	readonly placesPageQuery = this._placesPageGQL.watch();

	readonly places$ = this.placesPageQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(private readonly _placesPageGQL: PlacesPageGQL) {}
}
