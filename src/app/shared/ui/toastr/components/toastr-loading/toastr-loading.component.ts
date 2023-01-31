import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { HotToastRef } from "@ngneat/hot-toast";
import type { ISuccessData } from "@shared/ui/toastr";

@Component({
	selector: "app-toastr-loading",
	templateUrl: "./toastr-loading.component.html",
	styleUrls: ["./toastr-loading.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastrLoadingComponent implements OnInit {
	data?: ISuccessData;

	constructor(@Optional() @Inject(HotToastRef) private readonly toastRef: HotToastRef<ISuccessData>) {}

	ngOnInit() {
		this.data = this.toastRef.data;
	}

	close() {
		this.toastRef.close();
	}
}
