import type { AnimationTriggerMetadata } from "@angular/animations";
import { animate, style, transition, trigger } from "@angular/animations";

export const contentAppearAnimation: AnimationTriggerMetadata = trigger("contentAppear", [
	transition(":enter", [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))])
]);
