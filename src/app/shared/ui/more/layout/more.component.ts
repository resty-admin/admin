import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedService } from "@shared/services";
import type { IAction } from "@shared/ui/actions";

@Component({
	selector: "app-more",
	templateUrl: "./more.component.html",
	styleUrls: ["./more.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreComponent<T> {
	@Output() editClicked = new EventEmitter<T>();
	@Output() deleteClicked = new EventEmitter<T>();

	@Input() data?: T;
	@Input() disabled: boolean = false;

	@Input() actions: IAction<T>[] = [
		{
			icon: "edit",
			label: "EDIT",
			func: (data) => this.editClicked.emit(data)
		},
		{
			icon: "delete",
			label: "DELETE",
			func: (data) => this.deleteClicked.emit(data)
		}
	];

	@Input() additionalFunc = () => undefined;

	constructor(readonly sharedService: SharedService) {}
}
