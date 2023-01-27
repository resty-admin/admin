import { getI18nProvider } from "@shared/i18n";

import { WALLET_PAGE } from "../constants";

export const WALLET_I18N_PROVIDER = getI18nProvider(WALLET_PAGE, (lang) => import(`../i18n/${lang}.json`));
