import { animateChild, query, transition, trigger } from "@angular/animations";
import type { Injector } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { ANIMATION_MODULE_TYPE } from "@angular/platform-browser/animations";
import type { Route, RouterStateSnapshot } from "@angular/router";
import { GuardsCheckStart, NavigationCancel, NavigationEnd, Router, RoutesRecognized } from "@angular/router";
import type { Observable } from "rxjs";
import { concat, of } from "rxjs";
import { filter, map, mapTo, switchMap, takeUntil } from "rxjs/operators";

import type { IInternalRoute, INavigationSkeleton, INavigationSkeletonRoute } from "../interfaces";

@Component({
	selector: "app-navigation-skeleton",
	templateUrl: "./navigation-skeleton.component.html",
	styleUrls: ["./navigation-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("triggerChildAnimation", [transition("* => void", [query("@*", [animateChild()], { optional: true })])])
	]
})
export class NavigationSkeletonComponent {
	readonly skeleton: Observable<INavigationSkeleton | null>;

	constructor(
		private readonly _router: Router,
		@Inject(ANIMATION_MODULE_TYPE) @Optional() public readonly animations?: string | null
	) {
		const start = this._router.events.pipe(filter((event) => event instanceof GuardsCheckStart));
		const end = this._router.events.pipe(
			filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel)
		);
		const skeleton = this._router.events.pipe(
			filter((event: any) => event instanceof RoutesRecognized),
			map((event: RoutesRecognized) => this.getSkeleton(event.state))
		);

		this.skeleton = skeleton.pipe(
			switchMap((skeleton) => (skeleton ? concat(start.pipe(mapTo(skeleton), takeUntil(end)), of(null)) : of(null)))
		);
	}

	private getSkeleton(state: RouterStateSnapshot): INavigationSkeleton | null {
		let route = state.root;
		let injector = this.getRouteInjector(route.routeConfig)!;

		while (route.firstChild) {
			route = route.firstChild;
			injector = this.getRouteInjector(route.routeConfig) || injector;
		}

		const component = (route?.routeConfig as INavigationSkeletonRoute | null)?.skeleton?.component;

		return component ? { component, injector } : null;
	}

	private getRouteInjector(route: Route | null): Injector | null {
		return (route as IInternalRoute)?._loadedConfig?.module?.injector || null;
	}
}
