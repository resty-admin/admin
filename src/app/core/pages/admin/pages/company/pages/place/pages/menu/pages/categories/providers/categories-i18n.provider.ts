import { getI18nProviders } from "@shared/i18n";

import { CATEGORIES_PAGE } from "../constants";

export const CATEGORIES_I18N_PROVIDERS = getI18nProviders(CATEGORIES_PAGE, (lang) => import(`../i18n/${lang}.json`));
