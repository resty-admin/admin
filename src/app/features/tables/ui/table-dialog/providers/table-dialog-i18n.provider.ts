import { getI18nProvider } from "@shared/i18n";

import { TABLE_DIALOG } from "../constants";

export const TABLE_DIALOG_I18N_PROVIDER = getI18nProvider(TABLE_DIALOG, (lang) => import(`../i18n/${lang}.json`));
