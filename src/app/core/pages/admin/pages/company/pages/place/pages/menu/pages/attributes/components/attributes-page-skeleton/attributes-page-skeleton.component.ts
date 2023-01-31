import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-attributes-page-skeleton",
	templateUrl: "./attributes-page-skeleton.component.html",
	styleUrls: ["./attributes-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesPageSkeletonComponent {}
