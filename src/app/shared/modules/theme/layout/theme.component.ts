import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Renderer2 } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ThemeEnum } from "@shared/enums";
import { UniversalService } from "@shared/modules/universal";

import { ThemeService } from "../services";

@UntilDestroy()
@Component({
	selector: "app-theme",
	templateUrl: "theme.component.html",
	styleUrls: ["theme.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent implements OnInit {
	readonly formControl = new FormControl<boolean>();

	constructor(
		private readonly _universalService: UniversalService,
		private readonly _renderer2: Renderer2,
		private readonly _themeService: ThemeService
	) {}

	ngOnInit() {
		if (!this._universalService.isBrowser) {
			return;
		}

		this._themeService.theme$.pipe(untilDestroyed(this)).subscribe((theme) => {
			this.formControl.setValue(theme === ThemeEnum.DARK, { emitEvent: false });

			this._renderer2.removeClass(document.body, theme === ThemeEnum.LIGHT ? "dark" : "light");
			this._renderer2.addClass(document.body, theme === ThemeEnum.LIGHT ? "light" : "dark");
		});

		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((theme) => {
			this._themeService.setTheme(theme ? ThemeEnum.DARK : ThemeEnum.LIGHT);
		});
	}
}
