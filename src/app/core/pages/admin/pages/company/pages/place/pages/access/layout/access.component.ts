import { Clipboard } from "@angular/cdk/clipboard";
import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import { map } from "rxjs";

import { AccessPageGQL } from "../graphql/access-page";

@Component({
	selector: "app-access",
	templateUrl: "./access.component.html",
	styleUrls: ["./access.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessComponent implements OnInit {
	private readonly _accessPageQuery = this._accessPageGQL.watch();

	readonly accessCode$ = this._accessPageQuery.valueChanges.pipe(map((result) => result.data.place.waiterCode));

	constructor(
		private readonly _accessPageGQL: AccessPageGQL,
		private readonly _routerService: RouterService,
		private readonly _clipboard: Clipboard,
		private readonly _toastrService: ToastrService
	) {}

	copyCode(code: number) {
		this._clipboard.copy(code.toString());

		this._toastrService.success(undefined, { data: { title: "COPIED" } });
	}

	async ngOnInit() {
		await this._accessPageQuery.setVariables({
			placeId: this._routerService.getParams(PLACE_ID.slice(1))
		});
	}
}
