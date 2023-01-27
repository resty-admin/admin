import { getI18nProvider } from "@shared/i18n";

import { CORE_PAGE } from "../constants";

export const CORE_PAGE_I18N_PROVIDER = getI18nProvider(CORE_PAGE, (lang) => import(`../i18n/${lang}.json`));
