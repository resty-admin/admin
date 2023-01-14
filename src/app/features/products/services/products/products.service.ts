import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";

import type { CreateProductInput, ProductEntity, UpdateProductInput } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
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
			func: (product) => this.openUpdateProductDialog(product).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (product) => this.openDeleteProductDialog(product).pipe(take(1)).subscribe()
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createProductGQL: CreateProductGQL,
		private readonly _updateProductGQL: UpdateProductGQL,
		private readonly _deleteProductGQL: DeleteProductGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateProductDialog(data?: CreateProductInput) {
		return this._dialogService.open(ProductDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((product) => Boolean(product)),
			switchMap((product: ProductEntity) =>
				this.createProduct({
					name: product.name,
					category: product.category.id,
					attrsGroups: product.attrsGroups?.map((attrGroup) => attrGroup.id),
					file: product.file?.id,
					price: product.price
				})
			)
		);
	}

	openUpdateProductDialog(data: AtLeast<ProductEntity, "id">) {
		return this._dialogService.open(ProductDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((product) => Boolean(product)),
			switchMap((product: ProductEntity) =>
				this.updateProduct({
					id: product.id,
					category: product.category.id,
					attrsGroups: product.attrsGroups?.map((attrGroup) => attrGroup.id),
					file: product.file?.id,
					price: product.price
				})
			)
		);
	}

	openDeleteProductDialog(product: AtLeast<ProductEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить продукт?", value: product } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((product) => Boolean(product)),
			switchMap((product) => this.deleteProduct(product.id))
		);
	}

	createProduct(product: CreateProductInput) {
		console.log(product);
		return this._createProductGQL.mutate({ product }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateProduct(product: UpdateProductInput) {
		return this._updateProductGQL.mutate({ product }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteProduct(productId: string) {
		return this._deleteProductGQL.mutate({ productId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
