import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { ActionsService } from "@features/app";
import { ProductDialogComponent, ProductsService } from "@features/products";
import type { ProductEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID, PRODUCT_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { SelectionType } from "@swimlane/ngx-datatable";
import { filter, map, switchMap, take } from "rxjs";

import { ProductsPageGQL } from "../graphql";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly SelectionType = SelectionType;

	private readonly _productsPageQuery = this._productsPageGQL.watch();
	readonly products$ = this._productsPageQuery.valueChanges.pipe(map((result) => result.data.products.data));

	constructor(
		readonly sharedService: SharedService,
		private readonly _actionsService: ActionsService,
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _productsService: ProductsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		this._actionsService.setAction({ label: "ADD_PRODUCT", func: () => this.openCreateProductDialog() });

		await this._productsPageQuery.setVariables({
			filtersArgs: [
				{ key: "category.place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) }
			]
		});
	}

	async navigateToProduct() {
		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.PRODUCT.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
				.replace(PRODUCT_ID, "create")
		);
	}

	async openCreateProductDialog() {
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
							switchMap(() => this._productsPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("PRODUCTS.CREATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateProductDialog(data: AtLeast<ProductEntity, "id">) {
		this._dialogService
			.open(ProductDialogComponent, { data })
			.afterClosed$.pipe(
				take(1),
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
							take(1),
							switchMap(() => this._productsPageQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("PRODUCTS.UPDATE"))
						)
				)
			)
			.subscribe();
	}

	openDeleteProductDialog(product: AtLeast<ProductEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("PRODUCTS.CONFIRM"), value: product }
			})
			.afterClosed$.pipe(
				take(1),
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap((product) =>
					this._productsService.deleteProduct(product.id).pipe(
						take(1),
						switchMap(() => this._productsPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("PRODUCTS.DELETE"))
					)
				)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
