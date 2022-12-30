import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { CategoriesService } from "src/app/features/categories";
import { ProductsService } from "src/app/features/products";

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
		private readonly _productsService: ProductsService
	) {}

	openCreateCategoryDialog() {
		this._categoriesService.openCreateOrUpdateCategoryDialog().subscribe();
	}
}
