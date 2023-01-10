import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateCategoryInput, UpdateCategoryInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CategoryDialogComponent } from "../../components";
import { CategoriesGQL, CreateCategoryGQL, DeleteCategoryGQL, UpdateCategoryGQL } from "../../graphql/categories";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	private readonly _categoriesQuery = this._categoriesGQL.watch({ skip: 0, take: 10 });
	readonly categories$ = this._categoriesQuery.valueChanges.pipe(map((result) => result.data.categories.data));

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (category?: any) => this.openCreateOrUpdateCategoryDialog(category).subscribe()
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
		private readonly _categoriesGQL: CategoriesGQL,
		private readonly _createCategoryGQL: CreateCategoryGQL,
		private readonly _updateCategoryGQL: UpdateCategoryGQL,
		private readonly _deleteCategoryGQL: DeleteCategoryGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	openCreateOrUpdateCategoryDialog(data?: any) {
		return this._dialogService.openFormDialog(CategoryDialogComponent, { data }).pipe(
			switchMap((category: any) =>
				category.id
					? this.updateCategory({
							id: category.id,
							name: category.name,
							file: category.file
					  })
					: this.createCategory(category)
			)
		);
	}

	openDeleteCategoryDialog(category: any) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить категорию?",
					value: category
				}
			})
			.pipe(switchMap((category) => this.deleteCategory(category.id)));
	}

	createCategory(category: CreateCategoryInput) {
		return this._filesService.getFile(category.file).pipe(
			switchMap((file) => this._createCategoryGQL.mutate({ category: { ...category, file: file?.id } })),
			take(1),
			this._toastrService.observe("Категория"),
			tap(async () => {
				await this._categoriesQuery.refetch();
			})
		);
	}

	updateCategory(category: UpdateCategoryInput) {
		return this._filesService.getFile(category.file).pipe(
			switchMap((file) => this._updateCategoryGQL.mutate({ category: { ...category, file: file?.id } })),
			take(1),
			this._toastrService.observe("Категория"),
			tap(async () => {
				await this._categoriesQuery.refetch();
			})
		);
	}

	deleteCategory(categoryId: string) {
		return this._deleteCategoryGQL.mutate({ categoryId }).pipe(
			take(1),
			this._toastrService.observe("Категория"),
			tap(async () => {
				await this._categoriesQuery.refetch();
			})
		);
	}
}
