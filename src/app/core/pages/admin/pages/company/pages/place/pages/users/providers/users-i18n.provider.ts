import { getI18nProvider } from "@shared/i18n";

import { USERS_PAGE } from "../constants";

export const USERS_I18N_PROVIDER = getI18nProvider(USERS_PAGE, (lang) => import(`../i18n/${lang}.json`));
