import { getI18nProvider } from "@shared/i18n";

import { ORDER_DIALOG } from "../constants";

export const ORDER_DIALOG_I18N_PROVIDER = getI18nProvider(ORDER_DIALOG, (lang) => import(`../i18n/${lang}.json`));
