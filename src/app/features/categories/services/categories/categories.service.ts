import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";

import type { CategoryEntity, CreateCategoryInput, PlaceEntity, UpdateCategoryInput } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateCategoryGQL, DeleteCategoryGQL, UpdateCategoryGQL } from "../../graphql/categories";
import { CategoryDialogComponent } from "../../ui/category-dialog/layout/category-dialog.component";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	readonly actions: IAction<CategoryEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (category) => this.openUpdateCategoryDialog(category).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (category) => this.openDeleteCategoryDialog(category).pipe(take(1)).subscribe()
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createCategoryGQL: CreateCategoryGQL,
		private readonly _updateCategoryGQL: UpdateCategoryGQL,
		private readonly _deleteCategoryGQL: DeleteCategoryGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateCategoryDialog(data: AtLeast<CreateCategoryInput, "place">) {
		return this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category: CategoryEntity) =>
				this.createCategory({ name: category.name, place: data.place, file: category.file?.id })
			)
		);
	}

	openUpdateCategoryDialog(data: AtLeast<CategoryEntity, "id">) {
		return this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category: PlaceEntity) =>
				this.updateCategory({ id: category.id, name: category.name, file: category.file?.id })
			)
		);
	}

	openDeleteCategoryDialog(value: AtLeast<CategoryEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить категорию?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category) => this.deleteCategory(category.id))
		);
	}

	createCategory(category: CreateCategoryInput) {
		return this._createCategoryGQL.mutate({ category }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateCategory(category: UpdateCategoryInput) {
		return this._updateCategoryGQL.mutate({ category }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteCategory(categoryId: string) {
		return this._deleteCategoryGQL.mutate({ categoryId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
