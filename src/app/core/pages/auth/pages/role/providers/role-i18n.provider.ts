import { getI18nProviders } from "@shared/i18n";

import { ROLE_PAGE } from "../constants";

export const ROLE_I18N_PROVIDERS = getI18nProviders(ROLE_PAGE, (lang) => import(`../i18n/${lang}.json`));
