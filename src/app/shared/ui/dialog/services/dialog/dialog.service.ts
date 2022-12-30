import { Injectable } from "@angular/core";
import type { DialogConfig } from "@ngneat/dialog";
import { DialogService as NgxDialogService } from "@ngneat/dialog";
import type { DialogRef } from "@ngneat/dialog/lib/dialog-ref";
import { filter, take } from "rxjs";

@Injectable({ providedIn: "root" })
export class DialogService {
	constructor(private readonly _ngxDialogService: NgxDialogService) {}

	open(template: any, config?: Partial<DialogConfig>): DialogRef {
		return this._ngxDialogService.open(template, config);
	}

	openFormDialog(template: any, config?: Partial<DialogConfig>) {
		return this._ngxDialogService.open(template, config).afterClosed$.pipe(
			take(1),
			filter((data) => Boolean(data))
		);
	}
}
