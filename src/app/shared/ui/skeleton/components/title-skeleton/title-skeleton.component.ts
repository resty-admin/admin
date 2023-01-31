import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-title-skeleton",
	templateUrl: "./title-skeleton.component.html",
	styleUrls: ["./title-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleSkeletonComponent {}
