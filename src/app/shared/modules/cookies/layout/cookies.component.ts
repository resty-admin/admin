import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { CookiesService } from "../services";

@Component({
	selector: "app-cookies",
	templateUrl: "./cookies.component.html",
	styleUrls: ["./cookies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesComponent implements OnInit {
	constructor(private readonly _cookiesService: CookiesService) {}

	ngOnInit() {
		if (this._cookiesService.isClosed) {
			return;
		}

		this._cookiesService.showToastr();
	}
}
