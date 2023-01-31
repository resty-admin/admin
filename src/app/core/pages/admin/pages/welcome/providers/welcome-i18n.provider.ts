import { getI18nProviders } from "@shared/i18n";

import { WELCOME_PAGE } from "../constants";

export const WELCOME_I18N_PROVIDERS = getI18nProviders(WELCOME_PAGE, (lang) => import(`../i18n/${lang}.json`));
