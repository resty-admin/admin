import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { filter, firstValueFrom, map, switchMap, take } from "rxjs";
import type { ICategory } from "src/app/shared/interfaces";

import { PLACE_ID } from "../../../../shared/constants";
import { RouterService } from "../../../../shared/modules/router";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { AttributesGQL, CreateAttrGQL } from "../../graphql/attributes";
import { AttributeDialogComponent } from "../attribute-dialog/attribute-dialog.component";

@Component({
	selector: "app-attribute-group-dialog",
	templateUrl: "./attribute-group-dialog.component.html",
	styleUrls: ["./attribute-group-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeGroupDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		file: "",
		attributes: [[]],
		isUniq: false
	});

	readonly attributes$ = this._attrGQL.watch().valueChanges.pipe(map((result) => result.data.attributes.data));

	get placeId() {
		return this._routerService.getParams(PLACE_ID.slice(1));
	}

	readonly addTag = (name: string) =>
		firstValueFrom(
			this._dialogService.open(AttributeDialogComponent, { data: { name } }).afterClosed$.pipe(
				take(1),
				filter((attr) => Boolean(attr)),
				switchMap((attr: any) =>
					this._createAttrGQL.mutate({ attr }).pipe(take(1), this._toastrService.observe("Модификация"))
				)
			)
		);

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _dialogService: DialogService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService,
		private readonly _attrGQL: AttributesGQL,
		private readonly _createAttrGQL: CreateAttrGQL
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

	closeDialog(category: Partial<ICategory>) {
		this._dialogRef.close({ ...this.data, ...category });
	}
}
