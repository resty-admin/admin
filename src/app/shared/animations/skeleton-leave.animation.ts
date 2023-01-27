import type { AnimationTriggerMetadata } from "@angular/animations";
import { animate, style, transition, trigger } from "@angular/animations";

export const skeletonLeaveAnimation: AnimationTriggerMetadata = trigger("skeletonLeave", [
	transition(":leave", [style({ opacity: 1 }), animate(200, style({ opacity: 0 }))])
]);
