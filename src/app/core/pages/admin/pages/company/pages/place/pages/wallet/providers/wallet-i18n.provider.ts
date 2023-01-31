import { getI18nProviders } from "@shared/i18n";

import { WALLET_PAGE } from "../constants";

export const WALLET_I18N_PROVIDERS = getI18nProviders(WALLET_PAGE, (lang) => import(`../i18n/${lang}.json`));
