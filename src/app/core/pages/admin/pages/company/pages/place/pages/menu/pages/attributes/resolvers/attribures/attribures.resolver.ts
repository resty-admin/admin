import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { AttributesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AttriburesResolver implements Resolve<any> {
	constructor(private _placesPageGQL: AttributesPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.attributeGroups.data));
	}
}
