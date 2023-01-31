import { getI18nProviders } from "@shared/i18n";

import { PRODUCT_DIALOG } from "../constants";

export const PRODUCT_DIALOG_I18N_PROVIDERS = getI18nProviders(PRODUCT_DIALOG, (lang) => import(`../i18n/${lang}.json`));
