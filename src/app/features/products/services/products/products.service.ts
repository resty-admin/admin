import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateProductInput, ProductEntity, UpdateProductInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/file";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { ProductDialogComponent } from "../../components";
import { CreateProductGQL, DeleteProductGQL, ProductsGQL, UpdateProductGQL } from "../../graphql/products";

@Injectable({ providedIn: "root" })
export class ProductsService {
	private readonly _productsQuery = this._productsGQL.watch({ skip: 0, take: 10 });

	readonly products$ = this._productsQuery.valueChanges.pipe(map((result) => result.data.products.data));

	readonly actions: IAction<ProductEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (product?: ProductEntity) => this.openCreateOrUpdateProductDialog(product).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product?: ProductEntity) => {
				if (!product) {
					return;
				}

				this.openDeleteProductDialog(product).subscribe();
			}
		}
	];

	constructor(
		private readonly _productsGQL: ProductsGQL,
		private readonly _createProductGQL: CreateProductGQL,
		private readonly _updateProductGQL: UpdateProductGQL,
		private readonly _deleteProductGQL: DeleteProductGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	openCreateOrUpdateProductDialog(data?: any) {
		return this._dialogService.openFormDialog(ProductDialogComponent, { data }).pipe(
			switchMap((product: any) =>
				product.id
					? this.updateProduct({
							id: product.id,
							name: product.name,
							description: product.description,
							price: Number.parseFloat(product.price) || 0,
							file: product.file,
							category: product.category?.id,
							attrsGroups: product.attrsGroups?.map(({ id }: any) => id)
					  })
					: this.createProduct({
							...product,
							category: product.category?.id,
							attrsGroups: product.attrsGroups?.map(({ id }: any) => id),
							price: Number.parseFloat(product.price)
					  })
			)
		);
	}

	openDeleteProductDialog(product: ProductEntity) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить продукт?",
					value: product
				}
			})
			.pipe(switchMap((product) => this.deleteProduct(product.id)));
	}

	createProduct(product: CreateProductInput) {
		return this._filesService.getFile(product.file).pipe(
			switchMap((file) => this._createProductGQL.mutate({ product: { ...product, file: file?.id } })),
			take(1),
			this._toastrService.observe("Продукты"),
			tap(async () => {
				await this._productsQuery.refetch();
			})
		);
	}

	updateProduct(product: UpdateProductInput) {
		return this._filesService.getFile(product.file).pipe(
			switchMap((file) => this._updateProductGQL.mutate({ product: { ...product, file: file?.id } })),
			take(1),
			this._toastrService.observe("Продукты"),
			tap(async () => {
				await this._productsQuery.refetch();
			})
		);
	}

	deleteProduct(productId: string) {
		return this._deleteProductGQL.mutate({ productId }).pipe(
			take(1),
			this._toastrService.observe("Продукты"),
			tap(async () => {
				await this._productsQuery.refetch();
			})
		);
	}
}
