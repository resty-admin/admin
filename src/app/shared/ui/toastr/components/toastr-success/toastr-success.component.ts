import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { HotToastRef } from "@ngneat/hot-toast";

export interface ISuccessData {
	title: string;
	message: string;
}

@Component({
	selector: "app-toastr-success",
	templateUrl: "./toastr-success.component.html",
	styleUrls: ["./toastr-success.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastrSuccessComponent implements OnInit {
	data!: ISuccessData;

	constructor(@Optional() @Inject(HotToastRef) private readonly toastRef: HotToastRef<ISuccessData>) {}

	ngOnInit() {
		this.data = this.toastRef.data;
	}

	close() {
		this.toastRef.close();
	}
}
