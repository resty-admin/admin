import type { AfterViewInit } from "@angular/core";
import { Directive, ElementRef } from "@angular/core";

@Directive({
	selector: "[appHideIfNoContent]"
})
export class HideIfNoContentDirective implements AfterViewInit {
	constructor(private ref: ElementRef<HTMLElement>) {}
	ngAfterViewInit(): void {
		this.ref.nativeElement?.remove();
	}
}
