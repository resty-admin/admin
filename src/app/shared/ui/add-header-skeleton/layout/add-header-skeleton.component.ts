import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-add-header-skeleton",
	templateUrl: "./add-header-skeleton.component.html",
	styleUrls: ["./add-header-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHeaderSkeletonComponent {}
