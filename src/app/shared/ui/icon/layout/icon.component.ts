import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";

import { ICON_CONFIG } from "../injection-tokens";
import { IIconConfig, IIconTheme } from "../interfaces";

@Component({
	selector: "app-icon",
	templateUrl: "./icon.component.html",
	styleUrls: ["./icon.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges {
	@Input() name = "";
	@Input() width = "100%";
	@Input() height = "100%";
	@Input() theme: IIconTheme = "1";

	@Input() format: "png" | "svg" = "svg";

	svgStyle = { width: "100%", height: "100%" };
	src = "";
	className = `app-icon ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	constructor(@Optional() @Inject(ICON_CONFIG) private readonly _iconConfig: IIconConfig) {}

	ngOnChanges(changes: ISimpleChanges<IconComponent>) {
		if (changes.theme) {
			this.className = `app-icon ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.name || changes.format) {
			this.src = `${this._iconConfig.assetsUrl}/${this.name}.${this.format}`;
		}

		if (changes.width || changes.height) {
			this.svgStyle = { width: this.width, height: this.height };
		}
	}
}
