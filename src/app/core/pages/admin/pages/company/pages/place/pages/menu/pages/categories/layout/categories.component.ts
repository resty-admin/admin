import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { filter, switchMap, take } from "rxjs";
import type { ICategory } from "src/app/shared/interfaces";
import { CategoriesService } from "src/app/shared/modules/categories";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { ProductsService } from "../../../../../../../../../../../../shared/modules/products";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import { CategoryDialogComponent } from "../components";

@UntilDestroy()
@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
	readonly categories$ = this._categoriesService.categories$;
	readonly actions: IAction<ICategory>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (product?: ICategory) => this.openCategoryDialog(product)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product?: ICategory) => {
				if (!product) {
					return;
				}

				this.openDeleteCategoryDialog(product);
			}
		}
	];

	constructor(
		private readonly _categoriesService: CategoriesService,
		private readonly _productsService: ProductsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService
	) {}

	openCategoryDialog(category?: Partial<ICategory>) {
		this._dialogService
			.open(CategoryDialogComponent, { data: category })
			.afterClosed$.pipe(
				take(1),
				filter((category) => Boolean(category)),
				switchMap((category: Partial<ICategory>) =>
					category.id
						? this._categoriesService
								.updateCategory(category.id, category)
								.pipe(take(1), this._toastrService.observe("Категории"))
						: this._categoriesService
								.createCategory({
									...category,
									place: this._routerService.getParams(PLACE_ID.slice(1))
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Категории"))
				)
			)
			.subscribe();
	}

	openDeleteCategoryDialog(category: Partial<ICategory>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить категорию?",
					value: category
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((category) => Boolean(category)),
				switchMap((category) => this._categoriesService.deleteCategory(category.id))
			)
			.subscribe();
	}
}
