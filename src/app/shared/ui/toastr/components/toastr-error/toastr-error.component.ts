import type { OnInit } from "@angular/core";
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
export class ToastrErrorComponent implements OnInit {
	data!: IErrorData;

	constructor(@Optional() @Inject(HotToastRef) private readonly toastRef: HotToastRef<IErrorData>) {}

	ngOnInit() {
		this.data = this.toastRef.data;
	}

	close() {
		this.toastRef.close();
	}
}
