import { animate, query, style, transition, trigger } from "@angular/animations";

export const routerAnimation = trigger("routeAnimations", [
	transition("* <=> *", [
		query(":enter", [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))], { optional: true })
	])
]);
