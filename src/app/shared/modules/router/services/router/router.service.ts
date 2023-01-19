import { Injectable } from "@angular/core";
import type { NavigationBehaviorOptions, NavigationExtras, UrlTree } from "@angular/router";
import { NavigationEnd, Router } from "@angular/router";
import { RouterRepository } from "@ngneat/elf-ng-router-store";
import type { Observable } from "rxjs";
import { filter, map, startWith } from "rxjs";

@Injectable({ providedIn: "root" })
export class RouterService {
	readonly url$ = this._router.events.pipe(
		filter((event) => event instanceof NavigationEnd),
		startWith(this._router as unknown as NavigationEnd),
		map((event) => {
			const { url } = event as NavigationEnd;

			return url;
		})
	);

	constructor(private readonly _routerRepository: RouterRepository, private readonly _router: Router) {}

	navigate(commands: string[], extras?: NavigationExtras) {
		return this._router.navigate(commands, extras);
	}

	navigateByUrl(url: UrlTree | string, extras?: NavigationBehaviorOptions) {
		return this._router.navigateByUrl(url, extras);
	}

	getParams(name?: string) {
		return this._routerRepository.getParams(name);
	}

	selectParams(names?: string[] | string) {
		return this._routerRepository.selectParams(names as string);
	}

	getFragment() {
		return this._routerRepository.getFragment();
	}

	selectFragment(): Observable<string> {
		return this._routerRepository.selectFragment();
	}

	getQueryParams(name?: string) {
		return this._routerRepository.getQueryParams(name);
	}

	selectQueryParams<T extends string>(names?: string[] | string) {
		return this._routerRepository.selectQueryParams<T>(names as string);
	}
}
