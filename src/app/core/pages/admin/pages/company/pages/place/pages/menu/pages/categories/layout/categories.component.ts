import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CategoriesService, CategoryDialogComponent } from "@features/categories";
import { ProductDialogComponent, ProductsService } from "@features/products";
import type { ProductEntity } from "@graphql";
import type { CategoryEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { DeepAtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, switchMap, take } from "rxjs";

import { CATEGORIES_PAGE } from "../constants";
import { CategoriesPageService } from "../services";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
	readonly categoriesPage = CATEGORIES_PAGE;

	readonly categories$ = this._categoriesPageService.categories$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _categoriesPageService: CategoriesPageService,
		private readonly _categoriesService: CategoriesService,
		private readonly _productsService: ProductsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._actionsService.setAction({ label: "Добавить категорию", func: () => this.openCreateCategoryDialog() });
	}

	openCreateCategoryDialog() {
		return this._dialogService
			.open(CategoryDialogComponent)
			.afterClosed$.pipe(
				filter((category) => Boolean(category)),
				switchMap((category) =>
					this._categoriesService
						.createCategory({
							place: this._routerService.getParams(PLACE_ID.slice(1)),
							name: category.name,
							file: category.file?.id
						})
						.pipe(
							switchMap(() => this._categoriesPageService.categoriesPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("createCategory"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateCategoryDialog(data: DeepAtLeast<CategoryEntity, "id">) {
		return this._dialogService
			.open(CategoryDialogComponent, { data })
			.afterClosed$.pipe(
				filter((category) => Boolean(category)),
				switchMap((category) =>
					this._categoriesService
						.updateCategory({ id: category.id, name: category.name, file: category.file?.id })
						.pipe(
							switchMap(() => this._categoriesPageService.categoriesPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("updateCategory"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteCategoryDialog(value: DeepAtLeast<CategoryEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, { data: { title: this._i18nService.translate("confrimCategory"), value } })
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._categoriesService.deleteCategory(value.id).pipe(
						switchMap(() => this._categoriesPageService.categoriesPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("deleteCategory"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateProductDialog(data: DeepAtLeast<ProductEntity, "id">) {
		this._dialogService
			.open(ProductDialogComponent, { data })
			.afterClosed$.pipe(
				filter((product) => Boolean(product)),
				switchMap((product) =>
					this._productsService
						.updateProduct({
							id: product.id,
							category: product.category.id,
							attrsGroups: product.attrsGroups?.map((attrGroup: any) => attrGroup.id),
							file: product.file?.id,
							price: product.price
						})
						.pipe(
							switchMap(() => this._categoriesPageService.categoriesPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("updateProduct"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteProductDialog(product: DeepAtLeast<ProductEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("confirmProduct"), value: product }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._productsService.deleteProduct(product.id).pipe(
						switchMap(() => this._categoriesPageService.categoriesPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("deleteProduct"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
