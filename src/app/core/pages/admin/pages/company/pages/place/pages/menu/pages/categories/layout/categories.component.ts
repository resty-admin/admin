import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { CategoriesService } from "src/app/features/categories";
import { ProductsService } from "src/app/features/products";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";

@UntilDestroy()
@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
	readonly categories$: Observable<any> = this._categoriesService.categories$;

	readonly productActions = this._productsService.actions;
	readonly categoryActions = this._categoriesService.actions;

	constructor(
		private readonly _categoriesService: CategoriesService,
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService
	) {}

	openCreateCategoryDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));
		this._categoriesService.openCreateOrUpdateCategoryDialog({ place }).subscribe();
	}
}
