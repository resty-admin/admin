import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
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
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, lastValueFrom, map, switchMap, take } from "rxjs";

import { ProductAttributeGroupsGQL, ProductCategoriesGQL } from "../graphql";
import type { IProductForm } from "../interfaces";

@Component({
	selector: "app-product-dialog",
	templateUrl: "./product-dialog.component.html",
	styleUrls: ["./product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<any>({
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

	readonly addCategoryTag = (name: string) => lastValueFrom(this.openCreateCategoryDialog({ name }));

	readonly addAttributeGroupTag = (name: string) => lastValueFrom(this.openCreateAttributeGroupDialog({ name }));

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
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
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
			category: this.data.category?.id,
			attrsGroups: (this.data.attrsGroups || []).map((attr) => attr.id)
		});
	}

	openCreateAttributeGroupDialog(data: DeepPartial<AttributesGroupEntity>) {
		return this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup) =>
				this._attributeGroupsService
					.createAttributeGroup({
						name: attributeGroup.name,
						place: this._routerService.getParams(PLACE_ID.slice(1)),
						maxItemsForPick: attributeGroup.maxItemsForPick,
						type: attributeGroup.type,
						attributes: attributeGroup.attributes?.map((attribute: any) => attribute.id)
					})
					.pipe(
						switchMap((result) =>
							from(this._productAttributeGroupsQuery.refetch()).pipe(map(() => result.data?.createAttrGroup.id))
						),
						this._toastrService.observe(this._i18nService.translate("ATTRIBUTES_GROUP.CREATE"))
					)
			),
			take(1)
		);
	}

	openCreateCategoryDialog(data: DeepPartial<CategoryEntity>) {
		return this._dialogService.open(CategoryDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((category) => Boolean(category)),
			switchMap((category) =>
				this._categoriesService
					.createCategory({
						name: category.name,
						place: this._routerService.getParams(PLACE_ID.slice(1)),
						file: category.file?.id
					})
					.pipe(
						switchMap((result) =>
							from(this._productCategoriesQuery.refetch()).pipe(map(() => result.data?.createCategory.id))
						),
						this._toastrService.observe(this._i18nService.translate("CATEGORIES.CREATE"))
					)
			),
			take(1)
		);
	}

	closeDialog(product?: Partial<IProductForm>) {
		if (!product) {
			this._dialogRef.close();
			return;
		}

		this._filesService
			.getFile(product.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({
					...this.data,
					...product,
					category: { id: product.category },
					file
				});
			});
	}
}
