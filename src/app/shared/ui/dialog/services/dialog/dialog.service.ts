import { Injectable } from "@angular/core";
import type { DialogConfig } from "@ngneat/dialog";
import { DialogService as NgxDialogService } from "@ngneat/dialog";
import type { DialogRef } from "@ngneat/dialog/lib/dialog-ref";

@Injectable({ providedIn: "root" })
export class DialogService {
	constructor(private readonly _ngxDialogService: NgxDialogService) {}

	open(template: any, config?: Partial<DialogConfig>): DialogRef {
		return this._ngxDialogService.open(template, config);
	}
}
