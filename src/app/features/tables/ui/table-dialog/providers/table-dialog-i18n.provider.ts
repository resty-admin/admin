import { getI18nProviders } from "@shared/i18n";

import { TABLE_DIALOG } from "../constants";

export const TABLE_DIALOG_I18N_PROVIDERS = getI18nProviders(TABLE_DIALOG, (lang) => import(`../i18n/${lang}.json`));
