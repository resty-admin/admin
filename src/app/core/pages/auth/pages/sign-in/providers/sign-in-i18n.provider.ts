import { getI18nProviders } from "@shared/i18n";

import { SIGN_IN_PAGE } from "../constants";

export const SIGN_IN_I18N_PROVIDERS = getI18nProviders(SIGN_IN_PAGE, (lang) => import(`../i18n/${lang}.json`));
