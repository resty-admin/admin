import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { filter, switchMap, take } from "rxjs";
import type { IProduct } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { ProductsService } from "../../../../../../../../../../../../shared/modules/products";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import { ProductDialogComponent } from "../components";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly products$ = this._productsService.products$;
	readonly actions: IAction<IProduct>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (product?: IProduct) => this.openProductDialog(product)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product?: IProduct) => {
				if (!product) {
					return;
				}

				this.openDeleteProductDialog(product);
			}
		}
	];

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _productsService: ProductsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openProductDialog(product?: Partial<IProduct>) {
		this._dialogService
			.open(ProductDialogComponent, { data: product })
			.afterClosed$.pipe(
				take(1),
				filter((product) => Boolean(product)),
				switchMap((product: Partial<IProduct>) =>
					product.id
						? this._productsService
								.updateProduct(product.id, product)
								.pipe(take(1), this._toastrService.observe("Блюда"))
						: this._productsService
								.createProduct({
									...product,
									category: product.category?.id,
									price: Number(product.price)
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Блюда"))
				)
			)
			.subscribe();
	}

	openDeleteProductDialog(product: Partial<IProduct>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить блюдо?",
					value: product
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((product) => Boolean(product)),
				switchMap((product) => this._productsService.deleteProduct(product.id))
			)
			.subscribe();
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
}
