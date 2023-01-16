import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { ActionsService } from "../../../../../../../../../../features/app";
import { CONTRACT_PAGE_I18N } from "../constants";

@Component({
	selector: "app-contract",
	templateUrl: "./contract.component.html",
	styleUrls: ["./contract.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent implements OnInit, OnDestroy {
	readonly contractPageI18n = CONTRACT_PAGE_I18N;

	constructor(private readonly _actionsService: ActionsService) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "Подписать",
			func: () => {}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
