import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-wallet-header-skeleton",
	templateUrl: "./wallet-header-skeleton.component.html",
	styleUrls: ["./wallet-header-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletHeaderSkeletonComponent {}
