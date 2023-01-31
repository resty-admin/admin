import { getI18nProviders } from "@shared/i18n";

import { USERS_SELECT } from "../constants";

export const USERS_SELECT_I18N_PROVIDERS = getI18nProviders(USERS_SELECT, (lang) => import(`../i18n/${lang}.json`));
