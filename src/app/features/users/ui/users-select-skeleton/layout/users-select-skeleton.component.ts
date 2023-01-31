import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-users-select-skeleton",
	templateUrl: "./users-select-skeleton.component.html",
	styleUrls: ["./users-select-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSelectSkeletonComponent {}
