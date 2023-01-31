import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { NgxSkeletonLoaderConfig } from "ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types";
import type { NgxSkeletonLoaderConfigTheme } from "ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types";

@Component({
	selector: "app-skeleton",
	templateUrl: "./skeleton.component.html",
	styleUrls: ["./skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
	@Input() appearance: NgxSkeletonLoaderConfig["appearance"] = "line";
	@Input() count: number = 1;

	@Input() theme: NgxSkeletonLoaderConfigTheme | null = null;
	@Input() loaderTheme: NgxSkeletonLoaderConfigTheme | null = null;
}
