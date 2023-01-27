import { getI18nProvider } from "@shared/i18n";

import { PRODUCTS_PAGE } from "../constants";

export const PRODUCTS_I18N_PROVIDER = getI18nProvider(PRODUCTS_PAGE, (lang) => import(`../i18n/${lang}.json`));
