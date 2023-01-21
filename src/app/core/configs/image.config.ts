import { environment } from "@env/environment";
import type { IFactory } from "@shared/interfaces";
import { ThemeService } from "@shared/modules/theme";
import type { IImageConfig } from "@shared/ui/image";

export const IMAGE_CONFIG: IFactory<IImageConfig> = {
	useFactory: (themeService: ThemeService) => ({
		localAssetsUrl: "assets/images",
		remoteAssetsUrl: environment.assetsUrl,
		theme$: themeService.theme$
	}),
	deps: [ThemeService]
};
