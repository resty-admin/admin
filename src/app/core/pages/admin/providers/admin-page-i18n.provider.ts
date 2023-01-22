import { getI18nProvider } from "@shared/i18n";

import { ADMIN_PAGE_I18N } from "../constants";

export const ADMIN_PAGE_I18N_PROVIDER = getI18nProvider(ADMIN_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
