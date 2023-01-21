import { getI18nProvider } from "@shared/i18n";

import { ATTRIBUTES_PAGE_I18N } from "../constants";

export const ATTIRUBUTES_I18N_PROVIDER = getI18nProvider(
	ATTRIBUTES_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
