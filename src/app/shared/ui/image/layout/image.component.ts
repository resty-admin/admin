import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import { BehaviorSubject, filter, map, of, switchMap } from "rxjs";

import { IMAGE_CONFIG } from "../injection-tokens";
import { IImageConfig, IImageTheme } from "../interfaces";

@Component({
	selector: "app-image",
	templateUrl: "./image.component.html",
	styleUrls: ["./image.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnChanges {
	@Input() name? = "";
	@Input() theme: IImageTheme = "1";
	@Input() format: "png" | "svg" = "png";
	@Input() remote = false;
	@Input() placeholder = "";

	private readonly remoteSubject = new BehaviorSubject(false);
	private readonly remote$ = this.remoteSubject.asObservable();

	readonly src$ = this.remote$.pipe(
		switchMap((remote) =>
			remote
				? of(`${this._imageConfig.remoteAssetsUrl}/${this.name}`)
				: this._imageConfig.theme$.pipe(
						map((theme) => `${this._imageConfig.localAssetsUrl}/${theme}/${this.name}.${this.format}`)
				  )
		),
		filter(() => Boolean(this.name))
	);

	readonly placeholderSrc$ = this._imageConfig.theme$.pipe(
		map((theme) => `${this._imageConfig.localAssetsUrl}/${theme}/${this.placeholder}.${this.format}`),
		filter(() => Boolean(this.placeholder))
	);

	className = `app-image ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	constructor(@Optional() @Inject(IMAGE_CONFIG) private readonly _imageConfig: IImageConfig) {}

	ngOnChanges(changes: ISimpleChanges<ImageComponent>) {
		if (changes.theme) {
			this.className = `app-image ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.remote) {
			this.remoteSubject.next(changes.remote.currentValue);
		}
	}
}
