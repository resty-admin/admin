import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-toastr",
	templateUrl: "./toastr.component.html",
	styleUrls: ["./toastr.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastrComponent {}
