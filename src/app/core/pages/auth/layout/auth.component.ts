import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routerAnimation } from "@shared/animations";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
