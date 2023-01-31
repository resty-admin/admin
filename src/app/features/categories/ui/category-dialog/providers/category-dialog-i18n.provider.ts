import { getI18nProviders } from "@shared/i18n";

import { CATEGORY_DIALOG } from "../constants";

export const CATEGORY_DIALOG_I18N_PROVIDERS = getI18nProviders(
	CATEGORY_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
