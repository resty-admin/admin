import type { Observable } from "rxjs";

export interface IImageConfig {
	localAssetsUrl: string;
	remoteAssetsUrl: string;
	theme$: Observable<string>;
}
