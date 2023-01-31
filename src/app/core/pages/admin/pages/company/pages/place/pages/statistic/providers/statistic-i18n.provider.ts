import { getI18nProviders } from "@shared/i18n";

import { STATISTIC_PAGE } from "../constants";

export const STATISTIC_I18N_PROVIDERS = getI18nProviders(STATISTIC_PAGE, (lang) => import(`../i18n/${lang}.json`));
