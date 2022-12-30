import { Inject } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IProduct } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateProductInput, UpdateProductInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { ProductDialogComponent } from "../../components";
import { CreateProductGQL, DeleteProductGQL, ProductsGQL, UpdateProductGQL } from "../../graphql/products";

@Inject({ providedIn: "root" })
export class ProductsService {
	readonly actions: IAction<IProduct>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (product?: IProduct) => this.openCreateOrUpdateProductDialog(product).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product?: IProduct) => {
				if (!product) {
					return;
				}

				this.openDeleteProductDialog(product).subscribe();
			}
		}
	];

	readonly products$ = this._productsGQL.watch().valueChanges.pipe(map((result) => result.data.products.data));

	constructor(
		private readonly _productsGQL: ProductsGQL,
		private readonly _createProductGQL: CreateProductGQL,
		private readonly _updateProductGQL: UpdateProductGQL,
		private readonly _deleteProductGQL: DeleteProductGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._productsGQL.watch().refetch();
	}

	openCreateOrUpdateProductDialog(product?: any) {
		return this._dialogService
			.openFormDialog(ProductDialogComponent, { data: { product } })
			.pipe(switchMap((product: any) => (product.id ? this.updateProduct(product) : this.createProduct(product))));
	}

	openDeleteProductDialog(product: IProduct) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить продукт?",
					value: product
				}
			})
			.pipe(switchMap((product) => this._deleteProductGQL.mutate(product.id)));
	}

	createProduct(product: CreateProductInput) {
		return this._createProductGQL.mutate({ product }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateProduct(product: UpdateProductInput) {
		return this._updateProductGQL.mutate({ product }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteProduct(productId: string) {
		return this._deleteProductGQL.mutate({ productId }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
