import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IAction } from "../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../../shared/ui/dialog";
import { CardDialogComponent } from "../card-dialog/card-dialog.component";

@Component({
	selector: "app-wallet-card",
	templateUrl: "./wallet-card.component.html",
	styleUrls: ["./wallet-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletCardComponent {
	@Input() card: any;

	constructor(private readonly _dialogService: DialogService) {}

	openEditCardDialog(data: Partial<any>) {
		this._dialogService.openFormDialog(CardDialogComponent, { data }).subscribe();
	}

	openDeleteUserDialog(value: Partial<any>) {
		const data = { title: "Вы уверены, что хотите удалить карту?", value };
		this._dialogService.openFormDialog(ConfirmationDialogComponent, { data }).subscribe();
	}

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (card: any) => this.openEditCardDialog(card)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (card: any) => this.openDeleteUserDialog(card)
		}
	];
}
