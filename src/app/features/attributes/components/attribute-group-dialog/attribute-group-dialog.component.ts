import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { firstValueFrom } from "rxjs";
import { AttributesService } from "src/app/features/attributes/";

import { AttributeGroupTypeEnum } from "../../../../../graphql";
import { RouterService } from "../../../../shared/modules/router";
import { ToastrService } from "../../../../shared/ui/toastr";

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
		firstValueFrom(this._attributesService.openCreateOrUpdateAttributeDialog({ name }));

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
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

	closeDialog(attributeGroup: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...attributeGroup });
	}
}
