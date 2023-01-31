import { getI18nProviders } from "@shared/i18n";

import { ORDERS_PAGE } from "../constants";

export const ORDERS_I18N_PROVIDERS = getI18nProviders(ORDERS_PAGE, (lang) => import(`../i18n/${lang}.json`));
