import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-attributes-skeleton",
	templateUrl: "./attributes-skeleton.component.html",
	styleUrls: ["./attributes-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesSkeletonComponent {}
