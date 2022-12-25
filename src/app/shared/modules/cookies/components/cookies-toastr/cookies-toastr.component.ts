import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { HotToastRef } from "@ngneat/hot-toast";

import { CookiesService } from "../../services";

@Component({
	selector: "app-cookies-toastr",
	templateUrl: "./cookies-toastr.component.html",
	styleUrls: ["./cookies-toastr.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesToastrComponent {
	constructor(
		@Optional() @Inject(HotToastRef) public toastRef: HotToastRef<any>,
		private readonly _cookiesService: CookiesService
	) {}

	close() {
		this._cookiesService.close(this.toastRef);
	}
}
