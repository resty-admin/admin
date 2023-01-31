import { getI18nProviders } from "@shared/i18n";

import { ORDER_DIALOG } from "../constants";

export const ORDER_DIALOG_I18N_PROVIDERS = getI18nProviders(ORDER_DIALOG, (lang) => import(`../i18n/${lang}.json`));
