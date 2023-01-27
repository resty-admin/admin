import { getI18nProvider } from "@shared/i18n";

import { ORDERS_PAGE } from "../constants";

export const ORDERS_I18N_PROVIDER = getI18nProvider(ORDERS_PAGE, (lang) => import(`../i18n/${lang}.json`));
