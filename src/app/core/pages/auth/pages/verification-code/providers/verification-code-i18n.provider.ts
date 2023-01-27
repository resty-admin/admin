import { getI18nProvider } from "@shared/i18n";

import { VERIFICATION_CODE_PAGE } from "../constants";

export const VERIFICATION_CODE_I18N_PROVIDER = getI18nProvider(
	VERIFICATION_CODE_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
