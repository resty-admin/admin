import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IAction } from "../interfaces";

@Component({
	selector: "app-actions",
	templateUrl: "./actions.component.html",
	styleUrls: ["./actions.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent<T> {
	@Input() actions?: IAction<T>[] | null = [];
	@Input() data!: T;
	@Input() additionalFunc = () => undefined;

	trackByFn(index: number) {
		return index;
	}
}
