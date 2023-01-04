import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { filter, firstValueFrom, switchMap, take } from "rxjs";
import { AttributesService } from "src/app/features/attributes/";
import type { IAttributeGroup } from "src/app/shared/interfaces";

import { AttributeGroupTypeEnum } from "../../../../../graphql";
import { RouterService } from "../../../../shared/modules/router";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
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
		attributes: [[]],
		maxItemsForPick: 0,
		type: AttributeGroupTypeEnum.Add
	});

	readonly attributeGroupTypes = Object.entries(AttributeGroupTypeEnum).map(([key, value]) => ({
		name: key,
		value
	}));

	readonly attributes$ = this._attributesService.attributes$;

	readonly addTag = (name: string) =>
		firstValueFrom(
			this._dialogService.open(AttributeDialogComponent, { data: { name } }).afterClosed$.pipe(
				take(1),
				filter((attr) => Boolean(attr)),
				switchMap((attr: any) => this._attributesService.createAttribute(attr))
			)
		);

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _dialogService: DialogService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService,
		private readonly _attributesService: AttributesService
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

	closeDialog(attributeGroup: Partial<IAttributeGroup>) {
		this._dialogRef.close({ ...this.data, ...attributeGroup });
	}
}
