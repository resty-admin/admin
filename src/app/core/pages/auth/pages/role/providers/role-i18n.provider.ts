import { getI18nProvider } from "src/app/shared/i18n";

import { ROLE_PAGE_I18N } from "../constants";

export const ROLE_I18N_PROVIDER = getI18nProvider(ROLE_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
