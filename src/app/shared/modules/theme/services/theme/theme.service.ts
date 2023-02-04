import { Inject, Injectable } from "@angular/core";
import type { ThemeEnum } from "@shared/enums";
import { BehaviorSubject } from "rxjs";

import { THEME_CONFIG } from "../../injection-tokens";
import { IThemeConfig } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class ThemeService {
	private readonly _themeBehaviorSubject = new BehaviorSubject<ThemeEnum>(this._themeConfig.defaultTheme);
	readonly theme$ = this._themeBehaviorSubject.asObservable();

	constructor(@Inject(THEME_CONFIG) private readonly _themeConfig: IThemeConfig) {}

	setTheme(theme: ThemeEnum) {
		this._themeBehaviorSubject.next(theme);
	}
}
