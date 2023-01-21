import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM_I18N } from "@core/constants";
import { AttributeGroupsService } from "@features/attributes";
import { AttributeGroupDialogComponent } from "@features/attributes";
import { CategoriesService, CategoryDialogComponent } from "@features/categories";
import type { ProductEntity } from "@graphql";
import type { CategoryEntity } from "@graphql";
import type { AttributesGroupEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { PLACE_ID } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";
import { FilesService } from "@shared/modules/files";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { ProductAttributeGroupsGQL, ProductCategoriesGQL } from "../graphql";
import type { IProductForm } from "../interfaces";

@Component({
	selector: "app-product-dialog",
	templateUrl: "./product-dialog.component.html",
	styleUrls: ["./product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<IProductForm>({
		name: "",
		description: "",
		price: 0,
		file: undefined,
		category: undefined,
		attrsGroups: []
	});

	private readonly _productCategoriesQuery = this._productCategoriesGQL.watch({ skip: 0, take: 15 });
	private readonly _productAttributeGroupsQuery = this._productAttributeGroupsGQL.watch({ skip: 0, take: 15 });

	readonly categories$ = this._productCategoriesQuery.valueChanges.pipe(map((result) => result.data.categories.data));

	readonly attributeGroups$ = this._productAttributeGroupsQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	readonly addCategoryTag = (name: string) => this.openCreateCategoryDialog({ name });

	readonly addAttributeGroupTag = (name: string) => this.openCreateAttributeGroupDialog({ name });

	data?: ProductEntity;

	constructor(
		private readonly _productCategoriesGQL: ProductCategoriesGQL,
		private readonly _productAttributeGroupsGQL: ProductAttributeGroupsGQL,
		private readonly _routerService: RouterService,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async ngOnInit() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		await this._productCategoriesQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: place }]
		});

		await this._productAttributeGroupsQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: place }]
		});

		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue({
			...this.data,
			category: this.data.category?.id
		});
	}

	async openCreateAttributeGroupDialog(data: DeepPartial<AttributesGroupEntity>) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		const attributeGroup: AttributesGroupEntity | undefined = await lastValueFrom(
			this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$
		);

		if (!attributeGroup) {
			return;
		}

		const result = await lastValueFrom(
			this._attributeGroupsService
				.createAttributeGroup({
					name: attributeGroup.name,
					place,
					maxItemsForPick: attributeGroup.maxItemsForPick,
					type: attributeGroup.type,
					attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
				})
				.pipe(this._toastrService.observe("Группа модификаций"))
		);

		return result.data?.createAttrGroup;
	}

	async openCreateCategoryDialog(data: DeepPartial<CategoryEntity>) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		const category: CategoryEntity | undefined = await lastValueFrom(
			this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$
		);

		if (!category) {
			return;
		}

		const result = await lastValueFrom(
			this._categoriesService
				.createCategory({ name: category.name, place, file: category.file?.id })
				.pipe(this._toastrService.observe("Категория"))
		);

		return result.data?.createCategory;
	}

	async closeDialog(product?: Partial<IProductForm>) {
		if (!product) {
			this._dialogRef.close();
			return;
		}

		return this._dialogRef.close({
			...this.data,
			...product,
			category: { id: product.category },
			file: await lastValueFrom(this._filesService.getFile(product.file))
		});
	}
}
