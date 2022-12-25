import { Injectable } from "@angular/core";
import type { HotToastRef } from "@ngneat/hot-toast";

import { ToastrService } from "../../../../ui/toastr";
import { CookiesToastrComponent } from "../../components";
import { COOKIES_KEY } from "../../constants";

@Injectable({ providedIn: "root" })
export class CookiesService {
	readonly isClosed = localStorage.getItem(COOKIES_KEY);

	constructor(private readonly _toastrService: ToastrService) {}

	showToastr() {
		this._toastrService.show(CookiesToastrComponent, { autoClose: false, position: "bottom-right" });
	}

	close(hotToastRef: HotToastRef) {
		hotToastRef.close();
		localStorage.setItem(COOKIES_KEY, "closed");
	}
}
