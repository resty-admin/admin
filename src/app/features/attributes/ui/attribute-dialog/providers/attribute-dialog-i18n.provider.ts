import { getI18nProvider } from "@shared/i18n";

import { ATTRIBUTE_DIALOG } from "../constants";

export const ATTRIBUTE_DILAOG_I18N_PROVIDER = getI18nProvider(
	ATTRIBUTE_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
