import type { AnimationTriggerMetadata } from "@angular/animations";
import { animate, style, transition, trigger } from "@angular/animations";

export const skeletonLeaveAnimation: AnimationTriggerMetadata = trigger("skeletonLeave", [
	transition(":leave", [
		style({ opacity: 1, position: "absolute", top: 0, left: 0, right: 0 }),
		animate(200, style({ opacity: 0 }))
	])
]);
