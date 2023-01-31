import { getI18nProvider } from "@shared/i18n";

import { USERS_SELECT } from "../constants";

export const USERS_SELECT_I18N_PROVIDER = getI18nProvider(USERS_SELECT, (lang) => import(`../i18n/${lang}.json`));
