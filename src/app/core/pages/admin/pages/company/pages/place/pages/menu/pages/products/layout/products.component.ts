import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { ActionsService } from "@features/app";
import { ProductDialogComponent, ProductsService } from "@features/products";
import type { ProductEntity } from "@graphql";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, switchMap, take } from "rxjs";

import { PRODUCTS_PAGE } from "../constants";
import { ProductsPageService } from "../services";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;
	readonly productsPage = PRODUCTS_PAGE;

	readonly products$ = this._productsPageService.products$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _actionsService: ActionsService,
		private readonly _productsPageService: ProductsPageService,

		private readonly _productsService: ProductsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._actionsService.setAction({ label: "Добавить блюдо", func: () => this.openCreateProductDialog() });
	}

	openCreateProductDialog() {
		this._dialogService
			.open(ProductDialogComponent)
			.afterClosed$.pipe(
				filter((product) => Boolean(product)),
				switchMap((product) =>
					this._productsService
						.createProduct({
							name: product.name,
							description: product.description,
							category: product.category.id,
							attrsGroups: product.attrsGroups?.map((attrGroup: any) => attrGroup.id),
							file: product.file?.id,
							price: product.price
						})
						.pipe(
							switchMap(() => from(this._productsPageService.productsPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("createProduct"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateProductDialog(data: AtLeast<ProductEntity, "id">) {
		return this._dialogService
			.open(ProductDialogComponent, { data })
			.afterClosed$.pipe(
				filter((product) => Boolean(product)),
				switchMap((product) =>
					this._productsService
						.updateProduct({
							id: product.id,
							name: product.name,
							description: product.description,
							category: product.category.id,
							attrsGroups: product.attrsGroups?.map((attrGroup: any) => attrGroup.id),
							file: product.file?.id,
							price: product.price
						})
						.pipe(
							switchMap(() => from(this._productsPageService.productsPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("updateProduct"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteProductDialog(product: AtLeast<ProductEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("confirmProduct"), value: product }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap((product) =>
					this._productsService.deleteProduct(product.id).pipe(
						switchMap(() => from(this._productsPageService.productsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("deleteProduct"))
					)
				)
			);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
