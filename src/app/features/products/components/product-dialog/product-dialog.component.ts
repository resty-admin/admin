import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { IProduct } from "src/app/shared/interfaces";

import { AttributeGroupsService } from "../../../attributes";
import { CategoriesService } from "../../../categories";

@Component({
	selector: "app-product-dialog",
	templateUrl: "./product-dialog.component.html",
	styleUrls: ["./product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: null,
		price: null,
		file: null,
		category: null,
		attrsGroups: []
	});

	readonly categories$ = this._categoriesService.categories$;
	readonly attributeGroups$ = this._attributeGroupsService.attributeGroups$;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _attributeGroupsService: AttributeGroupsService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(product: Partial<IProduct>) {
		this._dialogRef.close({ ...this.data, ...product });
	}
}
