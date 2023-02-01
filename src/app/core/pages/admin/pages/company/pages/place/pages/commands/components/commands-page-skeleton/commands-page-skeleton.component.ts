import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-commands-page-skeleton",
	templateUrl: "./commands-page-skeleton.component.html",
	styleUrls: ["./commands-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsPageSkeletonComponent {}
