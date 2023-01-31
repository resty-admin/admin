import { getI18nProvider } from "@shared/i18n";

import { CATEGORIES_PAGE } from "../constants";

export const CATEGORIES_I18N_PROVIDER = getI18nProvider(CATEGORIES_PAGE, (lang) => import(`../i18n/${lang}.json`));
