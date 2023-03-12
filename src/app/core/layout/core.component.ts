import { registerLocaleData } from "@angular/common";
import localeUk from "@angular/common/locales/uk";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { routerAnimation } from "@shared/animations";

@UntilDestroy()
@Component({
	selector: "app-core",
	templateUrl: "./core.component.html",
	styleUrls: ["./core.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {
	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {
		registerLocaleData(localeUk);
	}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
