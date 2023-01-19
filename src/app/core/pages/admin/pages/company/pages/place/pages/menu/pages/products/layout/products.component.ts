import type { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";
import { ProductsService } from "src/app/features/products";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import type { ProductEntity } from "../../../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../../../features/app";
import { ProductDialogComponent } from "../../../../../../../../../../../../features/products/ui";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import type { AtLeast } from "../../../../../../../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../../../shared/ui/toastr";
import { PRODUCTS_PAGE_I18N } from "../constants";
import { ProductsPageGQL } from "../graphql/products-page";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly productsPageI18n = PRODUCTS_PAGE_I18N;
	private readonly _productsPageQuery = this._productsPageGQL.watch();

	readonly products$ = this._productsPageQuery.valueChanges.pipe(map((result) => result.data.products.data));

	readonly actions: IAction<ProductEntity>[] = [
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

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _actionsService: ActionsService,
		private readonly _toastrService: ToastrService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить блюдо",
			func: () => this.openCreateProductDialog()
		});

		await this._productsPageQuery.setVariables({
			filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
		});
	}

	async openCreateProductDialog() {
		const product: ProductEntity | undefined = await lastValueFrom(
			this._dialogService.open(ProductDialogComponent).afterClosed$
		);

		if (!product) {
			return;
		}

		await lastValueFrom(
			this._productsService
				.createProduct({
					name: product.name,
					description: product.description,
					category: product.category.id,
					attrsGroups: product.attrsGroups?.map((attrGroup) => attrGroup.id),
					file: product.file?.id,
					price: product.price
				})
				.pipe(this._toastrService.observe("Продукты"))
		);

		await this._productsPageQuery.refetch();
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
					name: product.name,
					description: product.description,
					category: product.category.id,
					attrsGroups: product.attrsGroups?.map((attrGroup) => attrGroup.id),
					file: product.file?.id,
					price: product.price
				})
				.pipe(this._toastrService.observe("Продукты"))
		);

		await this._productsPageQuery.refetch();
	}

	async openDeleteProductDialog(product: AtLeast<ProductEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить продукт?", value: product } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._productsService.deleteProduct(product.id).pipe(this._toastrService.observe("Продукты")));

		await this._productsPageQuery.refetch();
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "name",
				name: "Название"
			},
			{
				prop: "description",
				name: "Описание"
			},
			{
				prop: "category.name",
				name: "Категория"
			},
			{
				prop: "price",
				name: "Цена"
			},
			{
				cellTemplate: this.moreTemplate
			}
		];
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
