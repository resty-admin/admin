import { ThemeEnum } from "@shared/enums";
import type { IFactory } from "@shared/interfaces";
import type { IThemeConfig } from "@shared/modules/theme";

export const THEME_CONFIG: IFactory<IThemeConfig> = {
	useFactory: () => ({
		defaultTheme: ThemeEnum.LIGHT
	})
};
