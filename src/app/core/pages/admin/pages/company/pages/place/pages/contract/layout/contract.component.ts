import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";

import { CONTRACT_PAGE } from "../constants";

@Component({
	selector: "app-contract",
	templateUrl: "./contract.component.html",
	styleUrls: ["./contract.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent implements OnInit, OnDestroy {
	readonly contractPage = CONTRACT_PAGE;

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
