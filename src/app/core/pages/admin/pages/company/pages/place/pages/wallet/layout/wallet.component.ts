import { ChangeDetectionStrategy, Component } from "@angular/core";

import { DialogService } from "../../../../../../../../../../shared/ui/dialog";
import { CardDialogComponent } from "../components";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
	readonly cards = [{ name: "Mikhail Khomenko", code: "**** **** **** 0000" }];

	constructor(private readonly _dialogService: DialogService) {}

	openCreateCardDialog() {
		this._dialogService.openFormDialog(CardDialogComponent).subscribe();
	}
}
