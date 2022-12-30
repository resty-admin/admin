import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { ICategory } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateCategoryInput, UpdateCategoryInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/file";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CategoryDialogComponent } from "../../components";
import { CategoriesGQL, CreateCategoryGQL, DeleteCategoryGQL, UpdateCategoryGQL } from "../../graphql/categories";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	readonly actions: IAction<ICategory>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (category?: ICategory) => this.openCreateOrUpdateCategoryDialog(category)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (category?: ICategory) => {
				if (!category) {
					return;
				}

				this.openDeleteCategoryDialog(category);
			}
		}
	];

	readonly categories$ = this._categoriesGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.categories.data));

	constructor(
		private readonly _categoriesGQL: CategoriesGQL,
		private readonly _createCategoryGQL: CreateCategoryGQL,
		private readonly _updateCategoryGQL: UpdateCategoryGQL,
		private readonly _deleteCategoryGQL: DeleteCategoryGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	async refetch() {
		await this._categoriesGQL.watch({ skip: 0, take: 5 }).refetch();
	}

	openCreateOrUpdateCategoryDialog(data?: any) {
		return this._dialogService
			.openFormDialog(CategoryDialogComponent, { data })
			.pipe(
				switchMap((category: any) => (category.id ? this.updateCategory(category) : this.createCategory(category)))
			);
	}

	openDeleteCategoryDialog(category: ICategory) {
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
			tap((file) => {
				console.log(file);
			}),
			switchMap((file) => this._createCategoryGQL.mutate({ category: { ...category, file } })),
			take(1),
			this._toastrService.observe("Категория"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateCategory(category: UpdateCategoryInput) {
		return this._updateCategoryGQL.mutate({ category }).pipe(
			take(1),
			this._toastrService.observe("Категория"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteCategory(categoryId: string) {
		return this._deleteCategoryGQL.mutate({ categoryId }).pipe(
			take(1),
			this._toastrService.observe("Категория"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
