import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, take } from "rxjs";
import { DialogService } from "src/app/shared/ui/dialog";

import { CardDialogComponent } from "../../../../../../../../../../features/cards/components";
import type { IAction } from "../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
	readonly cards = [{ name: "Mikhail Khomenko", code: "**** **** **** 0000" }];

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (card?: any) => this.openCardDialog(card)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (card?: any) => {
				if (!card) {
					return;
				}

				this.openDeleteUserDialog(card);
			}
		}
	];

	constructor(private readonly _dialogService: DialogService) {}

	openCardDialog(hall?: Partial<any>) {
		this._dialogService
			.open(CardDialogComponent, { data: hall })
			.afterClosed$.pipe(
				take(1),
				filter((hall) => Boolean(hall))
			)
			.subscribe();
	}

	openDeleteUserDialog(card: Partial<any>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить карту?",
					value: card
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((user) => Boolean(user))
			)
			.subscribe();
	}
}
