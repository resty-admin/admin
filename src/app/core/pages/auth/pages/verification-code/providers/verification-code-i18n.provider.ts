import { getI18nProvider } from "@shared/i18n";

import { VERIFICATION_CODE_PAGE_I18N } from "../constants";

export const VERIFICATION_CODE_I18N_PROVIDER = getI18nProvider(
	VERIFICATION_CODE_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
