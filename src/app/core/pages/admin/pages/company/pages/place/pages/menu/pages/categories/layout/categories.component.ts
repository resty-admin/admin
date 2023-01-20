import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { CategoriesService } from "src/app/features/categories";
import { ProductsService } from "src/app/features/products";

import type { PlaceEntity, ProductEntity } from "../../../../../../../../../../../../../graphql";
import type { CategoryEntity } from "../../../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../../../features/app";
import { CategoryDialogComponent } from "../../../../../../../../../../../../features/categories/ui/category-dialog/layout/category-dialog.component";
import { ProductDialogComponent } from "../../../../../../../../../../../../features/products/ui";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import type { AtLeast } from "../../../../../../../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../../../shared/ui/toastr";
import { CATEGORIES_PAGE_I18N } from "../constants";
import { CategoriesPageGQL } from "../graphql/categories-page";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
	readonly categoriesPageI18n = CATEGORIES_PAGE_I18N;
	private readonly _categoriesPageQuery = this._categoriesPageGQL.watch();
	readonly categories$ = this._categoriesPageQuery.valueChanges.pipe(map((result) => result.data.categories.data));
	readonly categoryActions: IAction<CategoryEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (category) => this.openUpdateCategoryDialog(category)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (category) => this.openDeleteCategoryDialog(category)
		}
	];

	readonly productActions: IAction<ProductEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (product) => this.openUpdateProductDialog(product)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product) => this.openDeleteProductDialog(product)
		}
	];

	constructor(
		private readonly _categoriesPageGQL: CategoriesPageGQL,
		private readonly _categoriesService: CategoriesService,
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async openCreateCategoryDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		const category: CategoryEntity | undefined = await lastValueFrom(
			this._dialogService.open(CategoryDialogComponent).afterClosed$
		);

		if (!category) {
			return;
		}

		await lastValueFrom(
			this._categoriesService
				.createCategory({ name: category.name, place, file: category.file?.id })
				.pipe(this._toastrService.observe("Категории"))
		);

		await this._categoriesPageQuery.refetch();
	}

	async openUpdateCategoryDialog(data: AtLeast<CategoryEntity, "id">) {
		const category: PlaceEntity | undefined = await lastValueFrom(
			this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$
		);

		if (!category) {
			return;
		}

		await lastValueFrom(
			this._categoriesService
				.updateCategory({ id: category.id, name: category.name, file: category.file?.id })
				.pipe(this._toastrService.observe("Категории"))
		);

		await this._categoriesPageQuery.refetch();
	}

	async openDeleteCategoryDialog(value: AtLeast<CategoryEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить категорию?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._categoriesService.deleteCategory(value.id).pipe(this._toastrService.observe("Категории"))
		);

		await this._categoriesPageQuery.refetch();
	}

	async openUpdateProductDialog(data: AtLeast<ProductEntity, "id">) {
		const product: ProductEntity | undefined = await lastValueFrom(
			this._dialogService.open(ProductDialogComponent, { data }).afterClosed$
		);

		if (!product) {
			return;
		}

		await lastValueFrom(
			this._productsService
				.updateProduct({
					id: product.id,
					category: product.category.id,
					attrsGroups: product.attrsGroups?.map((attrGroup) => attrGroup.id),
					file: product.file?.id,
					price: product.price
				})
				.pipe(this._toastrService.observe("Продукты"))
		);

		await this._categoriesPageQuery.refetch();
	}

	async openDeleteProductDialog(product: AtLeast<ProductEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить продукт?", value: product } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._productsService.deleteProduct(product.id).pipe(this._toastrService.observe("Продукты")));

		await this._categoriesPageQuery.refetch();
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить категорию",
			func: () => this.openCreateCategoryDialog()
		});

		await this._categoriesPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
