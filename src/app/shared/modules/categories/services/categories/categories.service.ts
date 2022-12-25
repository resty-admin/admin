import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { CATEGORIES_ENDPOINTS } from "src/app/shared/endpoints";
import type { ICategory } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { CATEGORIES_QUERY, CATEGORY_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	readonly categoriesQuery = this._apolloService.watchQuery<any>({
		query: CATEGORIES_QUERY,
		variables: { take: 5, skip: 0, filtersString: "" }
	});

	readonly categories$ = this.categoriesQuery.valueChanges.pipe(map(({ data }) => data.categories.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async getCategories(placeId: string) {
		await this.categoriesQuery.setVariables({ filtersString: `?placeId=${placeId}` });

		return this.categoriesQuery.valueChanges.pipe(map(({ data }) => data.categories.data));
	}

	async refetchCategories() {
		await this.categoriesQuery.refetch();
	}

	getCategory(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: CATEGORY_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.category));
	}

	createCategory(category: Partial<ICategory>) {
		return this._apiService.post<ICategory>(CATEGORIES_ENDPOINTS.CREATE_CATEGORY, category);
	}

	updateCategory(id: string, category: Partial<ICategory>) {
		return this._apiService.patch<ICategory>(CATEGORIES_ENDPOINTS.UPDATE_CATEGORY.replace(DYNAMIC_ID, id), category);
	}

	deleteCategory(id: string) {
		return this._apiService.delete(CATEGORIES_ENDPOINTS.DELETE_CATEGORY.replace(DYNAMIC_ID, id));
	}
}
