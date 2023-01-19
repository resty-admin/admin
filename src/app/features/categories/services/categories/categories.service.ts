import { Injectable } from "@angular/core";

import type { CreateCategoryInput, UpdateCategoryInput } from "../../../../../graphql";
import { CreateCategoryGQL, DeleteCategoryGQL, UpdateCategoryGQL } from "../../graphql/categories";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	constructor(
		private readonly _createCategoryGQL: CreateCategoryGQL,
		private readonly _updateCategoryGQL: UpdateCategoryGQL,
		private readonly _deleteCategoryGQL: DeleteCategoryGQL
	) {}

	createCategory(category: CreateCategoryInput) {
		return this._createCategoryGQL.mutate({ category });
	}

	updateCategory(category: UpdateCategoryInput) {
		return this._updateCategoryGQL.mutate({ category });
	}

	deleteCategory(categoryId: string) {
		return this._deleteCategoryGQL.mutate({ categoryId });
	}
}
