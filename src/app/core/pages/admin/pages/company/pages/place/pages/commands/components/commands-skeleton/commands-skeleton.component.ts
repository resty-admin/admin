import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-commands-skeleton",
	templateUrl: "./commands-skeleton.component.html",
	styleUrls: ["./commands-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsSkeletonComponent {}
