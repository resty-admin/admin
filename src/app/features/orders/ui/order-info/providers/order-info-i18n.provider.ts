import { getI18nProviders } from "@shared/i18n";

import { ORDER_INFO } from "../constants";

export const ORDER_INFO_I18N_PROVIDERS = getI18nProviders(ORDER_INFO, (lang) => import(`../i18n/${lang}.json`));
