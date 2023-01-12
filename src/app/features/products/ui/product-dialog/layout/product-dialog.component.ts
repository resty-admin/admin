import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { firstValueFrom, map, shareReplay, take } from "rxjs";

import type { ProductEntity } from "../../../../../../graphql";
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
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: null,
		description: "",
		price: null,
		file: null,
		category: null,
		attrsGroups: []
	});

	private readonly _productDialogQuery = this._productDialogGQL.watch({ skip: 0, take: 5 });
	readonly productDialog$ = this._productDialogQuery.valueChanges.pipe(shareReplay({ refCount: true }));

	readonly categories$ = this.productDialog$.pipe(map((result) => result.data.categories.data));

	readonly attributeGroups$ = this.productDialog$.pipe(map((result) => result.data.attributeGroups.data));

	readonly addCategoryTag = (name: string) => {
		if (!this.placeId) {
			return;
		}
		return firstValueFrom(this._categoriesService.openCreateCategoryDialog({ name, place: this.placeId }));
	};

	readonly addAttributeGroupTag = (name: string) => {
		if (!this.placeId) {
			return;
		}

		return firstValueFrom(this._attributeGroupsService.openCreateAttributeGroupDialog({ name, place: this.placeId }));
	};

	constructor(
		private readonly _productDialogGQL: ProductDialogGQL,
		private readonly _routerService: RouterService,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _filesService: FilesService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	get placeId() {
		return this._routerService.getParams(PLACE_ID.slice(1));
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(product: Partial<ProductEntity>) {
		this._filesService
			.getFile(product.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({ ...this.data, ...product, file });
			});
	}
}
