import { getI18nProvider } from "@shared/i18n";

import { CONTRACT_PAGE_I18N } from "../constants";

export const CONTRACT_I18N_PROVIDER = getI18nProvider(CONTRACT_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
