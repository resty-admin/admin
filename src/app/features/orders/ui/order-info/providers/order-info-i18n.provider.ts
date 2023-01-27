import { getI18nProvider } from "@shared/i18n";

import { ORDER_INFO } from "../constants";

export const ORDER_INFO_I18N_PROVIDER = getI18nProvider(ORDER_INFO, (lang) => import(`../i18n/${lang}.json`));
