import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateProductInput, UpdateProductInput } from "../../../../../graphql";
import type { ProductEntity } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateProductGQL, DeleteProductGQL, UpdateProductGQL } from "../../graphql/products";
import { ProductDialogComponent } from "../../ui/product-dialog/layout/product-dialog.component";

@Injectable({ providedIn: "root" })
export class ProductsService {
	readonly actions: IAction<ProductEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (product?: ProductEntity) => this.openUpdateProductDialog(product).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product?: ProductEntity) => {
				if (!product) {
					return;
				}

				this.openDeleteProductDialog(product).pipe(take(1)).subscribe();
			}
		}
	];

	constructor(
		private readonly _createProductGQL: CreateProductGQL,
		private readonly _updateProductGQL: UpdateProductGQL,
		private readonly _deleteProductGQL: DeleteProductGQL,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService
	) {}

	openCreateProductDialog() {
		return this._dialogService.open(ProductDialogComponent).afterClosed$.pipe(
			take(1),
			filter((product) => Boolean(product)),
			switchMap((product: any) =>
				this.createProduct({
					...product,
					category: product.category?.id,
					attrsGroups: product.attrsGroups?.map(({ id }: any) => id),
					price: Number.parseFloat(product.price)
				})
			)
		);
	}

	openUpdateProductDialog(data?: any) {
		return this._dialogService.open(ProductDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((product) => Boolean(product)),
			switchMap((product: any) =>
				this.updateProduct({
					id: product.id,
					name: product.name,
					description: product.description,
					price: Number.parseFloat(product.price) || 0,
					file: product.file,
					category: product.category?.id,
					attrsGroups: product.attrsGroups?.map(({ id }: any) => id)
				})
			)
		);
	}

	openDeleteProductDialog(product: ProductEntity) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить продукт?",
				value: product
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((product) => Boolean(product)),
			switchMap((product) => this.deleteProduct(product.id))
		);
	}

	createProduct(product: CreateProductInput) {
		return this._filesService.getFile(product.file).pipe(
			take(1),
			switchMap((file) => this._createProductGQL.mutate({ product: { ...product, file: file?.id } }))
		);
	}

	updateProduct(product: UpdateProductInput) {
		return this._filesService.getFile(product.file).pipe(
			take(1),
			switchMap((file) => this._updateProductGQL.mutate({ product: { ...product, file: file?.id } }))
		);
	}

	deleteProduct(productId: string) {
		return this._deleteProductGQL.mutate({ productId });
	}
}
