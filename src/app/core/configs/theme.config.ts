import type { IFactory } from "src/app/shared/interfaces";

import type { IThemeConfig } from "../../shared/modules/theme";

export const THEME_CONFIG: IFactory<IThemeConfig> = {
	useFactory: () => ({
		defaultTheme: "dark"
	})
};
