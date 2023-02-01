import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

@Injectable({ providedIn: "root" })
export class NotificationsPageResolver implements Resolve<unknown> {
	resolve() {
		return true;
	}
}
