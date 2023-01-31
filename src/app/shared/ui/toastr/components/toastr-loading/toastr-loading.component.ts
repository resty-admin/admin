import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { HotToastRef } from "@ngneat/hot-toast";

@Component({
	selector: "app-toastr-loading",
	templateUrl: "./toastr-loading.component.html",
	styleUrls: ["./toastr-loading.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastrLoadingComponent {
	constructor(@Optional() @Inject(HotToastRef) public toastRef: HotToastRef<unknown>) {}

	close() {
		this.toastRef.close();
	}
}
