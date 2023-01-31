import { getI18nProviders } from "@shared/i18n";

import { PRODUCTS_PAGE } from "../constants";

export const PRODUCTS_I18N_PROVIDERS = getI18nProviders(PRODUCTS_PAGE, (lang) => import(`../i18n/${lang}.json`));
