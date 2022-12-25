import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { THEME_CONFIG } from "../../injection-tokens";
import type { ITheme } from "../../interfaces";
import { IThemeConfig } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class ThemeService {
	private readonly _themeBehaviorSubject = new BehaviorSubject<ITheme>(this._themeConfig.defaultTheme);
	readonly theme$ = this._themeBehaviorSubject.asObservable();

	constructor(@Inject(THEME_CONFIG) private readonly _themeConfig: IThemeConfig) {}

	setTheme(theme: ITheme) {
		this._themeBehaviorSubject.next(theme);
	}
}
