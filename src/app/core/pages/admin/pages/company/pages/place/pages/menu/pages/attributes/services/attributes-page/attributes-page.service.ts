import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AttributesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AttributesPageService {
	readonly attributesPageQuery = this._attributesPageGQL.watch();

	readonly attributeGroups$ = this.attributesPageQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	constructor(private readonly _attributesPageGQL: AttributesPageGQL) {}
}
