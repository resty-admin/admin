import { getI18nProvider } from "src/app/shared/i18n";

import { RESET_PASSWORD_PAGE_I18N } from "../constants";

export const RESET_PASSWORD_I18N_PROVIDER = getI18nProvider(
	RESET_PASSWORD_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
