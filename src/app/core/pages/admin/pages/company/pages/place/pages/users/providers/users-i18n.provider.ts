import { getI18nProviders } from "@shared/i18n";

import { USERS_PAGE } from "../constants";

export const USERS_I18N_PROVIDERS = getI18nProviders(USERS_PAGE, (lang) => import(`../i18n/${lang}.json`));
