import { getI18nProviders } from "@shared/i18n";

import { CORE_PAGE } from "../constants";

export const CORE_PAGE_I18N_PROVIDERS = getI18nProviders(CORE_PAGE, (lang) => import(`../i18n/${lang}.json`));
