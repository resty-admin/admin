import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom, map } from "rxjs";

import type { ProductEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { PLACE_ID } from "../../../../../shared/constants";
import { FilesService } from "../../../../../shared/modules/files";
import { RouterService } from "../../../../../shared/modules/router";
import { AttributeGroupsService } from "../../../../attributes";
import { CategoriesService } from "../../../../categories";
import { ProductDialogGQL } from "../graphql/product-dialog";

@Component({
	selector: "app-product-dialog",
	templateUrl: "./product-dialog.component.html",
	styleUrls: ["./product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: null,
		description: "",
		price: null,
		file: null,
		category: null,
		attrsGroups: []
	});

	private readonly _productDialogQuery = this._productDialogGQL.watch({ skip: 0, take: 5 });
	readonly productDialog$ = this._productDialogQuery.valueChanges;

	readonly categories$ = this.productDialog$.pipe(map((result) => result.data.categories.data));

	readonly attributeGroups$ = this.productDialog$.pipe(map((result) => result.data.attributeGroups.data));

	readonly addCategoryTag = (name: string) => {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		return this._categoriesService.openCreateCategoryDialog({ name, place });
	};

	readonly addAttributeGroupTag = (name: string) => {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		return this._attributeGroupsService.openCreateAttributeGroupDialog({ name, place });
	};

	data!: any;

	constructor(
		private readonly _productDialogGQL: ProductDialogGQL,
		private readonly _routerService: RouterService,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _filesService: FilesService
	) {}

	ngOnInit() {
		if (this._dialogRef.data) {
			this.data = this._dialogRef.data;
			this.formGroup.patchValue(this._dialogRef.data);
		}
	}

	async closeDialog(product: Partial<ProductEntity>) {
		const file = await lastValueFrom(this._filesService.getFile(product.file));

		return this._dialogRef.close({ ...this.data, ...product, file });
	}
}
