import { getI18nProviders } from "@shared/i18n";

import { VERIFICATION_CODE_PAGE } from "../constants";

export const VERIFICATION_CODE_I18N_PROVIDERS = getI18nProviders(
	VERIFICATION_CODE_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
