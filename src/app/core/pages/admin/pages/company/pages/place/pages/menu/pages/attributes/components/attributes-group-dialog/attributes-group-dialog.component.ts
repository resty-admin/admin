import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { filter, firstValueFrom, switchMap, take } from "rxjs";
import type { ICategory } from "src/app/shared/interfaces";
import type { IAttributesGroup } from "src/app/shared/interfaces";

import { PLACE_ID } from "../../../../../../../../../../../../../shared/constants";
import { AttributesService } from "../../../../../../../../../../../../../shared/modules/attributes";
import { RouterService } from "../../../../../../../../../../../../../shared/modules/router";
import { DialogService } from "../../../../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../../../../shared/ui/toastr";
import { AttributeDialogComponent } from "../attribute-dialog/attribute-dialog.component";

@Component({
	selector: "app-attributes-group-dialog",
	templateUrl: "./attributes-group-dialog.component.html",
	styleUrls: ["./attributes-group-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesGroupDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		file: "",
		attributes: [[]],
		isUniq: false
	});

	readonly attributes$ = this._attributesService.attributes$;

	readonly addTag = (name: string) =>
		firstValueFrom(
			this._dialogService.open(AttributeDialogComponent, { data: { name } }).afterClosed$.pipe(
				take(1),
				filter((attributeGroup) => Boolean(attributeGroup)),
				switchMap((attributeGroup: Partial<IAttributesGroup>) =>
					this._attributesService
						.createAttribute({
							...attributeGroup,
							place: this._routerService.getParams(PLACE_ID.slice(1))
						} as unknown as any)
						.pipe(take(1), this._toastrService.observe("Модификация"))
				)
			)
		);

	constructor(
		private readonly _attributesService: AttributesService,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _dialogService: DialogService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService
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
