import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-wallet-page-skeleton",
	templateUrl: "./wallet-page-skeleton.component.html",
	styleUrls: ["./wallet-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPageSkeletonComponent {}
