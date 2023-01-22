import { getI18nProvider } from "@shared/i18n";

import { TABLE_DIALOG_I18N } from "../constants";

export const TABLE_DIALOG_I18N_PROVIDER = getI18nProvider(TABLE_DIALOG_I18N, (lang) => import(`../i18n/${lang}.json`));
