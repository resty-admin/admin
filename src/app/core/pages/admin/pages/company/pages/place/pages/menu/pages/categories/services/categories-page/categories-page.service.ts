import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CategoriesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CategoriesPageService {
	readonly categoriesPageQuery = this._categoriesPageGQL.watch();

	readonly categories$ = this.categoriesPageQuery.valueChanges.pipe(map((result) => result.data.categories.data));

	constructor(private readonly _categoriesPageGQL: CategoriesPageGQL) {}
}
