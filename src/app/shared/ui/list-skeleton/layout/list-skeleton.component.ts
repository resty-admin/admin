import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-list-skeleton",
	templateUrl: "./list-skeleton.component.html",
	styleUrls: ["./list-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSkeletonComponent {}
