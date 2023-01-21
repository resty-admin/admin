import type { OnChanges } from "@angular/core";
import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";

@Directive({
	selector: "[appImagePlaceholder]"
})
export class ImagePlaceholderDirective implements OnChanges {
	constructor(private readonly _elementRef: ElementRef, private readonly _renderer: Renderer2) {}

	@Input() src: string | null = null;
	@Input() placeholder: string | null = null;

	isImageLoaded = false;

	ngOnChanges(changes: ISimpleChanges<ImagePlaceholderDirective>) {
		if (changes.src && changes.src.currentValue) {
			this._elementRef.nativeElement.src = this.placeholder;

			const img = new Image();
			img.src = changes.src.currentValue;

			img.onload = () => {
				this._elementRef.nativeElement.src = img.src;
				this.isImageLoaded = true;
			};
		}

		if (changes.placeholder && changes.placeholder.currentValue && !this.isImageLoaded) {
			this._elementRef.nativeElement.src = changes.placeholder.currentValue;
		}
	}
}
