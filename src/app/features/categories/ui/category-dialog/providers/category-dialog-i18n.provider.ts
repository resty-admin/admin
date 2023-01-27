import { getI18nProvider } from "@shared/i18n";

import { CATEGORY_DIALOG } from "../constants";

export const CATEGORY_DIALOG_I18N_PROVIDER = getI18nProvider(CATEGORY_DIALOG, (lang) => import(`../i18n/${lang}.json`));
