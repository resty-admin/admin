import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-wallet-skeleton",
	templateUrl: "./wallet-skeleton.component.html",
	styleUrls: ["./wallet-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletSkeletonComponent {}
