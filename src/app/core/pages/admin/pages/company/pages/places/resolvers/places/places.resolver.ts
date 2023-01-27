import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesResolver implements Resolve<any> {
	constructor(private _placesPageGQL: PlacesPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.places.data));
	}
}
