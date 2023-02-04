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
import { filter, map, switchMap, take } from "rxjs";

import { CategoriesPageGQL } from "../graphql";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
	private readonly _categoriesPageQuery = this._categoriesPageGQL.watch();
	readonly categories$ = this._categoriesPageQuery.valueChanges.pipe(map((result) => result.data.categories.data));

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _categoriesPageGQL: CategoriesPageGQL,
		private readonly _categoriesService: CategoriesService,
		private readonly _productsService: ProductsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		this._actionsService.setAction({ label: "ADD_CATEGORY", func: () => this.openCreateCategoryDialog() });

		await this._categoriesPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) }]
		});
	}

	openCreateCategoryDialog() {
		this._dialogService
			.open(CategoryDialogComponent)
			.afterClosed$.pipe(
				take(1),
				filter((category) => Boolean(category)),
				switchMap((category) =>
					this._categoriesService
						.createCategory({
							place: this._routerService.getParams(PLACE_ID.slice(1)),
							name: category.name,
							file: category.file?.id
						})
						.pipe(
							take(1),
							switchMap(() => this._categoriesPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("CATEGORIES.CREATE"))
						)
				)
			)
			.subscribe();
	}

	openUpdateCategoryDialog(data: DeepAtLeast<CategoryEntity, "id">) {
		this._dialogService
			.open(CategoryDialogComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((category) => Boolean(category)),
				switchMap((category) =>
					this._categoriesService
						.updateCategory({ id: category.id, name: category.name, file: category.file?.id })
						.pipe(
							take(1),
							switchMap(() => this._categoriesPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("CATEGORIES.UPDATE"))
						)
				)
			)
			.subscribe();
	}

	openDeleteCategoryDialog(value: DeepAtLeast<CategoryEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, { data: { title: this._i18nService.translate("CATEGORIES.CONFIRM"), value } })
			.afterClosed$.pipe(
				take(1),
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._categoriesService.deleteCategory(value.id).pipe(
						take(1),
						switchMap(() => this._categoriesPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("CATEGORIES.DELETE"))
					)
				)
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
							switchMap(() => this._categoriesPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("PRODUCTS.UPDATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteProductDialog(product: DeepAtLeast<ProductEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("PRODUCTS.CONFIRM"), value: product }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._productsService.deleteProduct(product.id).pipe(
						switchMap(() => this._categoriesPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("PRODUCTS.DELETE"))
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
