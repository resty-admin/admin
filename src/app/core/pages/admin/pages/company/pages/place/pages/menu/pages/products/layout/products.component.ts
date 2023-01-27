import type { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { ActionsService } from "@features/app";
import { ProductsService } from "@features/products";
import { ProductDialogComponent } from "@features/products/ui";
import type { ProductEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import type { IDatatableColumn } from "@shared/ui/datatable";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { PRODUCTS_PAGE } from "../constants";
import { ProductsPageGQL } from "../graphql";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly productsPage = PRODUCTS_PAGE;
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
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
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
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.productsPage),
						this._i18nService.translate("created", {}, this.productsPage)
					)
				)
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
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.productsPage),
						this._i18nService.translate("updated", {}, this.productsPage)
					)
				)
		);

		await this._productsPageQuery.refetch();
	}

	async openDeleteProductDialog(product: AtLeast<ProductEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить продукт?", value: product } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._productsService
				.deleteProduct(product.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.productsPage),
						this._i18nService.translate("deleted", {}, this.productsPage)
					)
				)
		);

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
