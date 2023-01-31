import { getI18nProviders } from "@shared/i18n";

import { ACCESS_PAGE } from "../constants";

export const ACCESS_I18N_PROVIDERS = getI18nProviders(ACCESS_PAGE, (lang) => import(`../i18n/${lang}.json`));
