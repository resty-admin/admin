import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";

@Component({
	selector: "app-contract",
	templateUrl: "./contract.component.html",
	styleUrls: ["./contract.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent implements OnInit, OnDestroy {
	constructor(private readonly _actionsService: ActionsService) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "SIGN",
			func: () => {}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
