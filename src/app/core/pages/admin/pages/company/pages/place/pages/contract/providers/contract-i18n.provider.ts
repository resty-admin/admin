import { getI18nProvider } from "@shared/i18n";

import { CONTRACT_PAGE } from "../constants";

export const CONTRACT_I18N_PROVIDER = getI18nProvider(CONTRACT_PAGE, (lang) => import(`../i18n/${lang}.json`));
