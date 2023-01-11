import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateCategoryInput, UpdateCategoryInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateCategoryGQL, DeleteCategoryGQL, UpdateCategoryGQL } from "../../graphql/categories";
import { CategoryDialogComponent } from "../../ui/category-dialog/layout/category-dialog.component";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (category?: any) => this.openUpdateCategoryDialog(category).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (category?: any) => {
				if (!category) {
					return;
				}

				this.openDeleteCategoryDialog(category).subscribe();
			}
		}
	];

	constructor(
		private readonly _createCategoryGQL: CreateCategoryGQL,
		private readonly _updateCategoryGQL: UpdateCategoryGQL,
		private readonly _deleteCategoryGQL: DeleteCategoryGQL,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService
	) {}

	openCreateCategoryDialog(data?: any) {
		return this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category: any) => this.createCategory(category))
		);
	}

	openUpdateCategoryDialog(data: any) {
		return this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category: any) => this.updateCategory(category))
		);
	}

	openDeleteCategoryDialog(category: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить категорию?",
				value: category
			}
		};
		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category) => this.deleteCategory(category.id))
		);
	}

	createCategory(category: CreateCategoryInput) {
		return this._filesService.getFile(category.file).pipe(
			take(1),
			switchMap((file) => this._createCategoryGQL.mutate({ category: { ...category, file: file?.id } }))
		);
	}

	updateCategory(category: UpdateCategoryInput) {
		return this._filesService.getFile(category.file).pipe(
			take(1),
			switchMap((file) => this._updateCategoryGQL.mutate({ category: { ...category, file: file?.id } }))
		);
	}

	deleteCategory(categoryId: string) {
		return this._deleteCategoryGQL.mutate({ categoryId });
	}
}
