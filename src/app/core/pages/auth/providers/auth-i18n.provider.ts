import { getI18nProviders } from "@shared/i18n";

import { AUTH_PAGE } from "../constants";

export const AUTH_I18N_PROVIDERS = getI18nProviders(AUTH_PAGE, (lang) => import(`../i18n/${lang}.json`));
