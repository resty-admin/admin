import { getI18nProvider } from "@shared/i18n";

import { ROLE_PAGE } from "../constants";

export const ROLE_I18N_PROVIDER = getI18nProvider(ROLE_PAGE, (lang) => import(`../i18n/${lang}.json`));
