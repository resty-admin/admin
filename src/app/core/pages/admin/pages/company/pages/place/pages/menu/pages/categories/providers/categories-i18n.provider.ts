import { getI18nProvider } from "@shared/i18n";

import { CATEGORIES_PAGE_I18N } from "../constants";

export const CATEGORIES_I18N_PROVIDER = getI18nProvider(CATEGORIES_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
