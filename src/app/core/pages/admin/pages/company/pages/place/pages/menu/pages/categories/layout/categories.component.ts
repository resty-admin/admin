import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { CategoriesService } from "src/app/features/categories";
import { ProductsService } from "src/app/features/products";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { CATEGORIES_PAGE_I18N } from "../constants";
import { CategoriesPageGQL } from "../graphql/categories-page";

@UntilDestroy()
@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
	readonly categoriesPageI18n = CATEGORIES_PAGE_I18N;
	private readonly _categoriesPageQuery = this._categoriesPageGQL.watch();
	readonly categories$ = this._categoriesPageQuery.valueChanges.pipe(map((result) => result.data.categories.data));
	readonly categoryActions = this._categoriesService.actions;
	readonly productActions = this._productsService.actions;

	constructor(
		private readonly _categoriesPageGQL: CategoriesPageGQL,
		private readonly _categoriesService: CategoriesService,
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService
	) {}

	openCreateCategoryDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		this._categoriesService.openCreateCategoryDialog({ place }).pipe(take(1)).subscribe();
	}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._categoriesPageQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});

		this._categoriesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._categoriesPageQuery.refetch();
		});
	}
}
