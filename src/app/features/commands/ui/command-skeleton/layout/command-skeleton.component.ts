import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-command-skeleton",
	templateUrl: "./command-skeleton.component.html",
	styleUrls: ["./command-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandSkeletonComponent {}
