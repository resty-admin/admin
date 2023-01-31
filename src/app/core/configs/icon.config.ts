import type { IFactory } from "@shared/interfaces";
import { ThemeService } from "@shared/modules/theme";
import type { IIconConfig } from "@shared/ui/icon/interfaces";

export const ICON_CONFIG: IFactory<IIconConfig> = {
	useFactory: (themeService: ThemeService) => ({
		assetsUrl: "assets/icons",
		theme$: themeService.theme$
	}),
	deps: [ThemeService]
};
