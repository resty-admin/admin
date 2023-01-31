import { getI18nProviders } from "@shared/i18n";

import { ATTRIBUTE_GROUP_DIALOG } from "../constants";

export const ATTRIBUTE_GROUP_DILAOG_I18N_PROVIDERS = getI18nProviders(
	ATTRIBUTE_GROUP_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
