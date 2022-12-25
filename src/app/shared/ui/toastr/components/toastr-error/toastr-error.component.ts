import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { HotToastRef } from "@ngneat/hot-toast";

export interface IErrorData {
	title: string;
	messages: string[];
}

@Component({
	selector: "app-toastr-error",
	templateUrl: "./toastr-error.component.html",
	styleUrls: ["./toastr-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastrErrorComponent {
	constructor(@Optional() @Inject(HotToastRef) private readonly toastRef: HotToastRef<IErrorData>) {}

	get data() {
		return this.toastRef.data;
	}

	close() {
		this.toastRef.close();
	}
}
