import { Injectable } from "@angular/core";
import { filter, take } from "rxjs";

import type { IAction } from "../../../../shared/ui/actions";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CardDialogComponent } from "../../ui/card-dialog/layout/card-dialog.component";

@Injectable({ providedIn: "root" })
export class CardsService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (card: any) => {
				this.openEditCardDialog(card).pipe(take(1)).subscribe();
			}
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (card: any) => {
				this.openDeleteCardDialog(card).pipe(take(1)).subscribe();
			}
		}
	];

	constructor(private readonly _dialogService: DialogService, private readonly _toastrService: ToastrService) {}

	openCreateCardDialog(data?: any) {
		return this._dialogService.open(CardDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((card) => Boolean(card))
		);
	}

	openEditCardDialog(data: any) {
		return this._dialogService.open(CardDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((card) => Boolean(card))
		);
	}

	openDeleteCardDialog(data: any) {
		return this._dialogService.open(CardDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((card) => Boolean(card))
		);
	}
}
