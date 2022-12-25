import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { ICON_CONFIG } from "../injection-tokens";
import { IIconConfig, IIconTheme } from "../interfaces";

@Component({
	selector: "app-icon",
	templateUrl: "./icon.component.html",
	styleUrls: ["./icon.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
	@Input() name = "";
	@Input() width = "100%";
	@Input() height = "100%";
	@Input() theme: IIconTheme = "1";

	@Input() format: "png" | "svg" = "svg";

	constructor(@Optional() @Inject(ICON_CONFIG) private readonly _iconConfig: IIconConfig) {}

	get src() {
		return `${this._iconConfig.assetsUrl}/${this.name}.${this.format}`;
	}

	get className() {
		return `app-icon ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}

	get svgStyle() {
		return { width: this.width, height: this.height };
	}
}
