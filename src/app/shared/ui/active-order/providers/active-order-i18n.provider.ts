import { getI18nProviders } from "@shared/i18n";

import { ACTIVE_ORDER } from "../constants";

export const ACTIVE_ORDER_I18N_PROVIDERS = getI18nProviders(ACTIVE_ORDER, (lang) => import(`../i18n/${lang}.json`));
